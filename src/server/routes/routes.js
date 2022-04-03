const express = require('express');
const authRouter = require('./authRouter');

const app = express();

app.use('/auth/', authRouter);

module.exports = app;
