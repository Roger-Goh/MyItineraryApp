var express = require('express');
var router = express.Router();

var ctrlAcc = require('../controllers/account');

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('register', { title: 'My Vacation Planner' });
});
*/
router.get('/', ctrlAcc.regForm);
router.post('/', ctrlAcc.regist);

module.exports = router;
