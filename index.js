var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var Uploaders = require('./uploaders');

var greetings = require('./greetings/index.js');
var users = require('./users/index.js');

var app = express();

app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.urlencoded({ extended: false })); // To parse URL encoded data
app.use(bodyParser.json()); // To parse request json -> req.body
app.use(cookieParser()); // To parse cookie json -> req.cookies
app.use(session({secret: `s3cr3t`}));

app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));

// This is only for demo
app.get('/demo-upload', (req, res) => res.render('demo-upload'));
app.post('/demo-upload', Uploaders.Image.single('image'), (req, res) => {
  console.log(req.body.name);
  res.redirect('/demo-upload');
});

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
app.use(users);

app.listen(3000);
