const express = require('express');
const response = require('./response');
const validation = require('./validation');

const app = express();

app.use(response);
app.use(validation);

module.exports = app;
