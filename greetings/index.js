var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.json({ text: "Greeting.GET" });
});
router.post('/', function(req, res){
  res.json({ text: "Greeting.POST" });
});

//export this router to use in our index.js
module.exports = router;