var mongoose = require("mongoose");     //mongoose package
require("../models/db")                 //connection
require("../models/holiday_model");     //model to use for manipulating data

var Holiday = mongoose.model('Holiday'); //an object we can query
var HolidaySchema = mongoose.model('HolidaySchema'); //'recipe' for creating a new entry
var TaskSchema = mongoose.model('TaskSchema');

//Retrieve holidays
//controls holiday data in createPlan.pug

module.exports.loadHolidays = index;

function index(req, res, next){
    console.log('index in viewFriend was called');
    console.log('Friend: '+req.body.friend); //req.body.param always gets from a POST method, req.query.param gets from a GET method
    Holiday.findOne({userName: req.body.friend}).exec( //replace with findOne(req.user)
        function(err, data){
            if(err){
                res.render('error', {
                    message:err.message,
                    error:err
                })
            }else{
                console.log('Find complete for loading');

                res.render('viewFriend', {
                    title: 'Vacation Planner', holidays:data, user:req.user, friend:req.body.friend}); //gives the view an array of holidayLists (holidays) from database //user:req.user is the session created when logged in or registered
                }
        }
    )
}

module.exports.createTask = function(req, res, next){
    console.log('create task function called');
    console.log('n: '+req.body.n);
    var newTask = new TaskSchema({
        taskname: req.body.taskname,                           //"Accommodation" 
        taskdesc: req.body.taskdesc,                           //"@Masaru organise a place to stay with free breakfast :)." 
        order: 1
    });
    //chooses which holiday is actually updated
    var holidayN= {$push: {"holiday3.tasks": newTask}, $inc: {"holiday3.nTasks": 1}}
    switch(req.body.n) {    //n is a hidden input value sent from the form depicting which holiday was selected
        case "1":
            holidayN = {$push: {"holiday1.tasks": newTask}, $inc: {"holiday1.nTasks": 1}};
            break;
        case "2":
            holidayN = {$push: {"holiday2.tasks": newTask}, $inc: {"holiday2.nTasks": 1}};
            break;
        default:
            holidayN = {$push: {"holiday3.tasks": newTask}, $inc: {"holiday3.nTasks": 1}};
    }
    Holiday.findOneAndUpdate({userName: req.body.friend}, holidayN, function (err, data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log('Find complete for updating, holidayN: '+holidayN);
            console.log('reqbodyfriend'+req.body.friend);
            console.log(data, ' saved');
            index(req,res,next);
        }
      });
}

//when +1 priority is clicked on a task
module.exports.incrementPriority = function(req, res, next){
    console.log('incrementPriority function called');
    console.log('user: '+req.body.friend);
    console.log('user: '+req.body.taskName);
    console.log('n: '+req.body.n);
    //chooses which holiday is actually updated
    var filter = {userName: req.body.friend, "holiday3.tasks.taskname": req.body.taskName} //finds the right user data, then finds the right task
    var holidayN= {$inc: {"holiday3.tasks.$.order": -1}} //decrements the order property in task
    switch(req.body.n) {    //n is a hidden input value sent from the form depicting which holiday was selected
        case "1":
            filter = {userName: req.body.friend, "holiday1.tasks.taskname": req.body.taskName}
            holidayN = {$inc: {"holiday1.tasks.$.order": -1}}
            break;
        case "2":
            filter = {userName: req.body.friend, "holiday2.tasks.taskname": req.body.taskName}
            holidayN = {$inc: {"holiday2.tasks.$.order": -1}}
            break;
        default:
            filter = {userName: req.body.friend, "holiday3.tasks.taskname": req.body.taskName}
            holidayN = {$inc: {"holiday3.tasks.$.order": -1}}
    }
    Holiday.findOneAndUpdate(filter, holidayN, function (err, data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log('successful incrementation of priority, holidayN: '+holidayN);

            console.log(data, ' saved');
            index(req,res,next);
        }
      });
}

//module.exports = createPlan;