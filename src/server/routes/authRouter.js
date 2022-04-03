const express = require('express');
const authController = require('../controllers/authController');
const registerValidator = require('../validators/registerValidator');

const router = express.Router();

router.post('/register', registerValidator, authController.register);

module.exports = router;
