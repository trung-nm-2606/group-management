var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send("Welcome to Group Management");
});

app.listen(3000);
