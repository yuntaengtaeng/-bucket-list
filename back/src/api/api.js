const express = require('express');
const app = express();

const apiMain = require('./main/index');
app.use('/main', apiMain);

module.exports = app;
