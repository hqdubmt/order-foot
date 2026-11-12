const express = require('express');
const codeCustom = require('../../../utils/codeCustom.util');
const router = express.Router();

router.get('/', (req, res) => {
  const healthcheck = {
    status: 'OK',
    code: codeCustom.SUCCESS.code,
    description: codeCustom.SUCCESS.description,
    message: 'Server is running',
    timestamp: new Date()
  };
  res.status(200).json(healthcheck);   
});


// auth routes
router.use('/auth', require('./auth/index'));
router.use('/users', require('./users/index'));
module.exports = router;
