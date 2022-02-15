var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var greetings = require('./greetings/index.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: false })); // To parse URL encoded data
app.use(bodyParser.json()); // To parse request json
app.use(cookieParser()); // To parse cookie json -> req.cookies

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
  res.send("Welcome to Group Management");
});

app.use('/greetings', greetings);

app.listen(3000);
