var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');

var greetings = require('./greetings/index.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: false })); // To parse URL encoded data
app.use(bodyParser.json()); // To parse request json -> req.body
app.use(cookieParser()); // To parse cookie json -> req.cookies
app.use(multer().array()); // To parse multipart/form-data

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
  res.send('Welcome to Group Management');
});

app.use('/greetings', greetings);

app.listen(3000);
