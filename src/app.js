const express = require('express');
const errorHandlerUtils = require('./utils/errorHandler.utils');
const { NotFoundError } = require('./cors/reasonPhrases.cors');
const configureMiddlewares = require('./middlewares');
const swaggerDocs = require('./app/v1/docs/swapger.Docs');
const swaggerUi = require('swagger-ui-express');

// Nạp cấu hình môi trường đã xử lý xong xuôi từ thư mục configs
const finalConfig = require('./configs/app.config');

const app = express();

// Lưu cấu hình vào bộ nhớ của app để file server.js có thể lấy ra sử dụng
app.set('config', finalConfig);

configureMiddlewares(app, finalConfig);

// PHÂN CHIA PHIÊN BẢN API (Group Versioning)
const apiRouter = express.Router();
const v1Routes = require('./app/v1/routers/index');

// Gộp các đường dẫn v1 vào API chính
apiRouter.use('/v1', v1Routes); // Tạo ra đường dẫn dạng: /api/v1
app.use('/api', apiRouter);     // Tạo ra đường dẫn gốc: /api

app.get('/api/docs.json', (req, res) => {
  res.status(200).json(swaggerDocs);
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
});
app.use(errorHandlerUtils); // Bắt lỗi và trả về thông tin lỗi cho khách hàng

module.exports = app;
