var express = require('express');
var greetings = require('./greetings.js');
var app = express();

app.get('/', function(req, res) {
  res.send("Welcome to Group Management");
});

app.use('/greetings', greetings);

app.listen(3000);
