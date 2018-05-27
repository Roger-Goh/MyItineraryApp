var express = require('express');
var router = express.Router();
var ctrlHoliday = require('../controllers/holidayLister');

//No need to render the view as it is done in the controller
router.get('/', ctrlHoliday.loadHolidays); //loadHolidays gives the view an array of holidays from database
router.post('/', ctrlHoliday.newHoliday); //is called by action='/createPlan' in createPlan view
router.post('/deleteHoliday', ctrlHoliday.deleteHoliday);
router.post('/createTask', ctrlHoliday.createTask);

module.exports = router;
