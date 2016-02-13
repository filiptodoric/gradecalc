var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("This is the session: " + req.session.email);

  if (req.session.email) {
    res.render('index');
    console.log("I'm here");
    getUser(req, res);
  }
  else {
    res.render('index');
  }
});

module.exports = router;
