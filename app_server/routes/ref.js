var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ref', { title: 'My Vacation Planner' });
});

module.exports = router;
