const { body, sanitizeBody } = require('express-validator');

const resendConfirmOtp = [
  body('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  sanitizeBody('email').escape(),
];

module.exports = resendConfirmOtp;
