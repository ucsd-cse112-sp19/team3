'use strict';

const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

app.use('/', express.static(__dirname + '/Examples'));
// Handle 404 page
app.use((req, res, next) => {
  res.sendStatus(404);
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port);

console.log("Server started at %d", port);
