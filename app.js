
// const stripe = require("stripe")("sk_test_vAL5prlCfC16QTrEGIAeEtp9");

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mailer = require('express-mailer');
require('dotenv').config();
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var index = require('./routes/index');
var join = require('./routes/join');
var invite = require('./routes/invite');
var processPayment = require('./routes/processPayment');
var login = require('./routes/login');
var webhook = require('./routes/webhook');
var passwordReset = require('./routes/password-reset');
var changePassword = require('./routes/change-password');
var edit = require('./routes/edit');
var share = require('./routes/share');
const formidable = require('express-formidable');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use('public/javascripts', express.static(path.join(__dirname, '/public/javascripts')));
app.use('public/stylesheets', express.static(path.join(__dirname, '/public/stylesheets')));
// app.use(bodyParser({keepExtensions:true,uploadDir:path.join(__dirname, '/public/images/headshots')}));  
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/group', index);
app.use('/group', invite);
app.use('/group', share);
app.use('/join', join);
app.use('/charge', processPayment);
app.use('/login', login);
app.use('/webhook', webhook);
app.use('/password-reset', passwordReset);
app.use('/password-reset', changePassword);
app.use('/group', edit);

mailer.extend(app, {
  from: 'tomstestmailer@gmail.com',
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASS
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
