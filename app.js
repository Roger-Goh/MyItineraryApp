var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//for passport
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');

var homeRouter = require('./app_server/routes/home'); //mine :)
var refRouter = require('./app_server/routes/ref');
var registerRouter = require('./app_server/routes/register');
var loginRouter = require('./app_server/routes/login');
var createPlanRouter = require('./app_server/routes/createPlan');

var ctrlMain = require('./app_server/controllers/holidayLister');
var models = require('./app_server/models/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//for passport
app.use(require('express-session')(
  {
    secret: 'CITS3403',
    resave: false,
    saveUninitialized: false
  }
));
app.use(passport.initialize());
app.use(passport.session());
//end of passport

app.use('/', homeRouter); //when no sub path is provided //used to be indexrouter
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/ref', refRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/createPlan', createPlanRouter);
app.use('/createPlan/deleteHoliday', createPlanRouter);

//passport config

var Account = require('./app_server/models/account');
passport.use(new localStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

require('./app_server/models/db');
module.exports = app;