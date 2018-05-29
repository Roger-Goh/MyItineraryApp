var express = require('express');
var router = express.Router();
var ctrlHoliday = require('../controllers/viewFriend');
var ctrlAcc = require('../controllers/account');

//No need to render the view as it is done in the controller
router.get('/', ctrlHoliday.loadHolidays); //loadHolidays gives the view an array of holidays from database
//router.post('/', ctrlHoliday.newHoliday); //is called by action='/createPlan' in createPlan view
//router.post('/deleteHoliday', ctrlHoliday.deleteHoliday);
router.post('/',ctrlHoliday.loadHolidays);
router.post('/createTask', ctrlHoliday.createTask);
router.post('/priority', ctrlHoliday.incrementPriority);
router.get('/logout', ctrlAcc.logout);


module.exports = router;
