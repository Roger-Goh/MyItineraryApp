var express = require('express');
var router = express.Router();
var ctrlHoliday = require('../controllers/holidayLister');
var ctrlAcc = require('../controllers/account');

//No need to render the view as it is done in the controller
router.get('/', ctrlHoliday.loadHolidays); //loadHolidays gives the view an array of holidays from database
router.post('/', ctrlHoliday.newHoliday); //is called by action='/createPlan' in createPlan view
router.post('/deleteHoliday', ctrlHoliday.deleteHoliday);
router.post('/createTask', ctrlHoliday.createTask);
router.post('/priority', ctrlHoliday.incrementPriority);
router.get('/logout', ctrlAcc.logout);

//go to holidayLister controller to redirect the req,res to the viewFriend controller
router.post('/viewFriend', function(req, res, next){
  res.redirect('/viewFriend');
});


module.exports = router;
