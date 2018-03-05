const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
 
mongoose.connect('mongodb://localhost/learn-app', { 
}) 
  .then(() => console.log('mongodb connected...')) 
  .catch(err => console.log(err)); 

//SCHEMA SETUP
var studentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String
});

var Student = mongoose.model("student", studentSchema);

Student.create(
{
  first_name: "Michael",
  last_name:"Zhen"
}, function(err, student){
  if(err){
    console.log(err);
  } else {
    console.log("created student:");
    console.log(student);
  }
});

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
