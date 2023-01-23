const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');
const API = require('./api/api');
const app = express();

app.use('/api', API);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = awsServerlessExpress.createServer(app);

module.exports.index = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);
