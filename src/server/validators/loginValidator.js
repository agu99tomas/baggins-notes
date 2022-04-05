const { body, sanitizeBody } = require('express-validator');

const loginValidator = [
  body('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  body('password')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Password must be specified.'),
  sanitizeBody('email').escape(),
  sanitizeBody('password').escape(),
];

module.exports = loginValidator;
