var mongoose = require("mongoose");
require("../models/db")
require("../models/holiday_model");

//handling accounts
var Account = require("../models/account");
var passport = require('passport');

//adding a new holiday list for when a new account is made
var Holiday = mongoose.model('Holiday');

//var Account = mongoose.model('Account');

module.exports.regForm = function(req, res) {
    res.render('register', { user : req.user });
};


module.exports.regist = function(req, res) {
    Account.register(new Account({ username : req.body.username }), 
           req.body.password, 
       function(err, account) {
                 if (err) {
                    console.log('rego failed');
                   return res.render('register', { msg : 'rego failed'});
                 }
                 passport.authenticate('local')(req, res, function () {
                     console.log('Created new account');
                        createUser(req, res);
                   //res.redirect('/createPlan'); //maybe comment out and put in createUser
                   });
               });
};

//when regist creates a new account, creates a new holidayList for them to load in view
function createUser(req, res){
    var newUser = new Holiday({
        "userName": req.body.username, //maybe req.user.username instead
        "nHolidays": 0,
        "holiday1": {"hasEntry": "0",
            "dest": "Sample",
            "year": 2019,
            "desc": "Example description here",
            "nTasks": 0,
            "tasks": []
        },
        "holiday2": {
            "hasEntry": "0",
            "dest": "Sample",
            "year": 2020,
            "desc": "Example description here",
            "nTasks": 0,
            "tasks": []
        },
        "holiday3": {
            "hasEntry": "0",
            "dest": "Sample",
            "year": 2021,
            "desc": "Example description here",
            "nTasks": 0,
            "tasks": []
        }
    });
    Holiday.create(newUser, function(err, data){ //.create is the model equivalent to collection.insert()
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log('Created user data for new account');
            res.redirect('/createPlan');
        }
      });
};

module.exports.loginForm = function(req, res) {
    res.render('login', { user : req.user });
};

module.exports.login =  function(req, res) {

   passport.authenticate('local')(req, res, function () {
        res.redirect('/createPlan');
    });
    
 //passport.authenticate('local', { successRedirect: '/',
 //        failureRedirect: '/login'
 //        failureFlash: true 
//})
    
};

module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/home');
};