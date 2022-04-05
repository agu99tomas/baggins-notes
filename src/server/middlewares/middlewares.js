const express = require('express');
const responseMiddleware = require('../middlewares/responseMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

const app = express();

app.use(responseMiddleware);
app.use(validationMiddleware);

module.exports = app;
