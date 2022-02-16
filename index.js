var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var app = express();

var api = require('./api');

app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.urlencoded({ extended: false })); // To parse URL encoded data
app.use(bodyParser.json()); // To parse request json -> req.body
app.use(cookieParser()); // To parse cookie json -> req.cookies
app.use(session({secret: `s3cr3t`}));

app.use('/uploads', express.static('uploads'));
app.use(express.static('react-app/build'));

app.use('/api', api);

// All not-found routes served by ExpressJs will be directed to ReactJS
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'react-app/build/index.html'));
});

app.listen(3000);
