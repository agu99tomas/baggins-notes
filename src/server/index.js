const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const routes = require('./routes/routes');

mongoose.connect('mongodb://localhost/baggins-notes');

const app = express();

app.listen(process.env.PORT || 8080);
app.use(express.static('dist'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/', routes);
