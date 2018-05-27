var express = require('express');
var router = express.Router();

var ctrlAcc = require('../controllers/account');

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('login', { title: 'My Vacation Planner' });
});
*/

router.get('/', ctrlAcc.loginForm);
router.post('/', ctrlAcc.login);

module.exports = router;
