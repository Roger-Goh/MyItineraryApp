var mongoose = require("mongoose");     //mongoose package
require("../models/db")                 //connection
require("../models/holiday_model");     //model to use for manipulating data

var Holiday = mongoose.model('Holiday'); //an object we can query

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
                console.log('Find complete');

                res.render('createPlan', {
                    title: 'Vacation Planner', holidays:data}); //gives the view an array of holidays (holidays) from database
                    
            }
        }
    )
}
//module.exports = createPlan;