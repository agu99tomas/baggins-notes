const { validationResult } = require('express-validator');

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.validationErrorWithData('Validation Error', errors.array());
  }
  next();
};

module.exports = validationMiddleware;
