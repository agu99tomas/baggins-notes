const express = require('express');
const authRouter = require('./authRouter');
const noteRouter = require('./noteRouter');

const app = express();

app.use('/auth/', authRouter);
app.use('/note/', noteRouter);

module.exports = app;
