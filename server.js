if (!process.env.PORT) {
  require('dotenv').config()
  process.env.NODE_ENV = "dev"
}

//Web App framework for Nodejs
const express = require('express');
//Utilites for working with files and directories
const path = require('path');
//Delivers favicons with extra fun features
const favicon = require('serve-favicon');
//http request logging middleware
const logger = require('morgan');
//Parse http headers for cookies
const cookieParser = require('cookie-parser');
//Parse request bodies
const bodyParser = require('body-parser');
// Use Patch, Put, and Delete methods 
const methodOverride = require('method-override')
// Add Email support
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const app = express();
console.log(process.env.TEST);
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/petes-pets');

//Create locals for Stripe API
app.locals.PUBLIC_STRIPE_API_KEY = process.env.PUBLIC_STRIPE_API_KEY

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.EMAIL_DOMAIN
  }
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

// SEND EMAIL
const user = {
  email: 'justin@jaytria.com',
  name: 'Emily',
  age: '43'
};

nodemailerMailgun.sendMail({
  from: 'no-reply@example.com',
  to: user.email, // An array if you have multiple recipients.
  subject: 'Hey you, awesome!',
  template: {
    name: 'email.handlebars',
    engine: 'handlebars',
    context: user
  }
}).then(info => {
  console.log('Response: ' + info);
}).catch(err => {
  console.log('Error: ' + err);
});

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/index.js')(app);
require('./routes/pets.js')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
