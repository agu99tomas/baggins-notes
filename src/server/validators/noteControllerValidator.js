const { body } = require('express-validator');

exports.addNote = [
  body('title').notEmpty().trim().withMessage('Title must be specified.'),
  body('description')
    .notEmpty()
    .trim()
    .withMessage('Description must be specified.'),
  body('category').notEmpty().trim().withMessage('Category must be specified.'),
];
