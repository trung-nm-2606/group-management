var express = require('express');
var db = require('../db');

var router = express.Router();

router.get('/', function(req, res){
  db.query('select * from users where pk = 1', (err, rows) => {
    if (err) return;

    const lord = rows[0];
    res.json({ text: 'Greeting.GET', lord });
  });
});

router.get('/:name', function(req, res){
  res.json({ text: `Greetings! ${req.params.name}` });
});

router.post('/', function(req, res){
  res.json({ text: 'Greeting.POST' });
});

//export this router to use in our index.js
module.exports = router;
