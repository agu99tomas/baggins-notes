const { body, sanitizeBody } = require('express-validator');

const verifyConfirmValidator = [
  body('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  body('otp').isLength({ min: 1 }).trim().withMessage('OTP must be specified.'),
  sanitizeBody('email').escape(),
  sanitizeBody('otp').escape(),
];

module.exports = verifyConfirmValidator;
