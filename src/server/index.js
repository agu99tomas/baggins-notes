const express = require('express');
require('dotenv').config();
const routes = require('./routes/routes');
const middlewares = require('./middlewares/middlewares');
const db = require('./db/db');

db.connect();
const app = express();

app.listen(process.env.PORT || 8080);
app.use(express.static('dist'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(middlewares);

app.use('/api/', routes);
