const express = require('express');
require('dotenv').config();
const routes = require('./routes/routes');
const response = require('./middlewares/response');
const dbConnect = require('./db/dbConnect');

dbConnect();
const app = express();

app.listen(process.env.PORT || 8080);
app.use(express.static('dist'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(response);

app.use('/api/', routes);
