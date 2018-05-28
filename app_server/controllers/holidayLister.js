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
    Holiday.findOne({userName: req.user.username}).exec( //replace with findOne(req.user)
        function(err, data){
            if(err){
                res.render('error', {
                    message:err.message,
                    error:err
                })
            }else{
                console.log('Find complete for loading');

                res.render('createPlan', {
                    title: 'Vacation Planner', holidays:data, user:req.user}); //gives the view an array of holidayLists (holidays) from database //user:req.user is the session created when logged in or registered
                }
        }
    )
}

module.exports.newHoliday = updateHoliday;

function updateHoliday(req, res, next){
    console.log('update holiday function called');
    console.log('n: '+req.body.n);
    var newHoliday = new HolidaySchema({
        hasEntry: "1",                          
        dest: req.body.dest,           //req is the form that sent the request                
        year: req.body.year,           //.dest, .year, .desc are extracted by name='dest' in form not by id          
        desc: req.body.desc,                              
        nTasks: 0                            
        //tasks: []
    });
    //chooses which holiday is actually updated
    var holidayN= {holiday3: newHoliday};
    switch(req.body.n) {    //n is a hidden input value sent from the form depicting which holiday was selected
        case "1":
            holidayN = {holiday1: newHoliday};
            break;
        case "2":
            holidayN = {holiday2: newHoliday};
            break;
        default:
            holidayN = {holiday3: newHoliday};
    }
    Holiday.findOneAndUpdate({userName: req.user.username}, holidayN, function (err, data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log('Find complete for updating, holidayN: '+holidayN);

            console.log(data, ' saved');
            index(req,res,next);
        }
      });
}

module.exports.deleteHoliday = function(req, res, next){
    console.log('delete holiday function called');
    console.log('n: '+req.body.n);
    var newHoliday = new HolidaySchema({
        hasEntry: "0",                          
        dest: "Sample",           //req is the form that sent the request                
        year: 2020,           //.dest, .year, .desc are extracted by name='dest' in form not by id          
        desc: "Example description here",                              
        nTasks: 0,                            
        tasks: []
    });
    //chooses which holiday is actually updated
    var holidayN= {holiday3: newHoliday};
    switch(req.body.n) {    //n is a hidden input value sent from the form depicting which holiday was selected
        case "1":
            holidayN = {holiday1: newHoliday};
            break;
        case "2":
            holidayN = {holiday2: newHoliday};
            break;
        default:
            holidayN = {holiday3: newHoliday};
    }
    Holiday.findOneAndUpdate({userName: req.user.username}, holidayN, function (err, data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log('Find complete for updating, holidayN: '+holidayN);

            console.log(data, ' saved');
            index(req,res,next);
        }
      });
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
    Holiday.findOneAndUpdate({userName: req.user.username}, holidayN, function (err, data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log('Find complete for updating, holidayN: '+holidayN);

            console.log(data, ' saved');
            index(req,res,next);
        }
      });
}

//module.exports = createPlan;