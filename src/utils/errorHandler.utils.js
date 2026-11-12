const { ErrorReponser } = require('../cors/errorReponser.cors');
const codeCustom = require('./codeCustom.util');

const errorHandlerUtils = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const normalizedError = error instanceof Error
    ? error
    : error && typeof error === 'object'
      ? Object.assign(new Error(error.message || 'Unknown error'), error)
      : new Error(String(error || 'Unknown error'));
  const status = Number.isInteger(normalizedError.status) && normalizedError.status >= 400 && normalizedError.status <= 599
    ? normalizedError.status
    : Number.isInteger(normalizedError.statusCode) && normalizedError.statusCode >= 400 && normalizedError.statusCode <= 599
      ? normalizedError.statusCode
      : 500;
  const isServerError = status >= 500;
  const errorDefinition = typeof normalizedError.code === 'string'
    ? codeCustom[normalizedError.code]
    : codeCustom.getByCode(normalizedError.code);
  const codeDefinition = errorDefinition?.status === status
    ? errorDefinition
    : codeCustom.getByStatus(status) || codeCustom.INTERNAL_SERVER_ERROR;

  if (isServerError) {
    console.error(normalizedError);
  }

  return new ErrorReponser({
    status,
    code: codeDefinition.code,
    message: isServerError
      ? 'Internal Server Error'
      : normalizedError.message || codeDefinition.message,
    description: codeDefinition.description
  }).send(res);
};

module.exports = errorHandlerUtils;
