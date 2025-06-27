// server/express.js
const express = require('express');
const path = require('path');

function createHttpServer() {
  const app = express();

app.use(express.static(path.join(__dirname, '../public')));


  return require('http').createServer(app);
}

module.exports = createHttpServer;
