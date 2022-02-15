var express = require('express');
var db = require('../db');

var router = express.Router();

router.get('/', async (req, res) => {
  const query = 'select * from users where pk = 1';
  try {
    rows = await db.query(query);
    res.json({ text: 'Greeting.GET', lord: rows[0] });
  } catch (e) {
    res.json({ text: 'Greeting.GET' });
  }
});

router.get('/:name', function(req, res){
  res.json({ text: `Greetings! ${req.params.name}` });
});

router.post('/', function(req, res){
  res.json({ text: 'Greeting.POST' });
});

//export this router to use in our index.js
module.exports = router;
