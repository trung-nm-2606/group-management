var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var session = require('express-session');

var greetings = require('./greetings/index.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: false })); // To parse URL encoded data
app.use(bodyParser.json()); // To parse request json -> req.body
app.use(cookieParser()); // To parse cookie json -> req.cookies
app.use(multer().array()); // To parse multipart/form-data
app.use(session({secret: `s3cr3t`}));

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
  let views = 1;
  if(req.session.page_views){
    req.session.page_views++;
    views = req.session.page_views;
  } else {
    req.session.page_views = 1;
  }
  res.send(`Welcome to Group Management: ${views}`);
});

app.use('/greetings', greetings);

app.listen(3000);
