const express = require('express');
const app = express();

const apiMain = require('./main/index');
app.use('/main', apiMain);

const apiCategory = require('./category/index');
app.use('/category', apiCategory);

const apiAuth = require('./auth/index');
app.use('/auth', apiAuth);

const apiToken = require('./token/index');
app.use('/token', apiToken);

module.exports = app;
