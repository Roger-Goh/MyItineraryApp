var mongoose = require("mongoose");     //mongoose package
require("../models/db")                 //connection
require("../models/holiday_model");     //model to use for manipulating data

var Holiday = mongoose.model('Holiday'); //an object we can query
var HolidaySchema = mongoose.model('HolidaySchema'); //'recipe' for creating a new entry

//Retrieve holidays
//controls holiday data in createPlan.pug

module.exports.loadHolidays = index;

function index(req, res, next){
    Holiday.find().exec(
        function(err, data){
            if(err){
                res.render('error', {
                    message:err.message,
                    error:err
                })
            }else{
                console.log('Find complete for loading');

                res.render('createPlan', {
                    title: 'Vacation Planner', holidays:data}); //gives the view an array of holidayLists (holidays) from database
                    
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
    Holiday.findOneAndUpdate({userName: "Roger"}, holidayN, function (err, data){
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