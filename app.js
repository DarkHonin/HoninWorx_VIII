var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var db_init = require('./common/db')
var app = express();
const session = require('express-session');


var {jwtMiddleware} = require('./common/jwt')

const config = require('./common/config') 
app.locals.env = config

// Body parser
app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
      secret: process.env.session_secret,
      resave: false,
      saveUninitialized: true
  })
);


// app.use(tg_auth_middleware)

app.use(sassMiddleware({
  src: path.join(__dirname, '/public/sass'),
  dest: path.join(__dirname, '/public/stylesheets'),
  prefix:  '/stylesheets',
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
  debug: true
}));

app.use(express.static(path.join(__dirname, 'public')));
db_init()

// Routers:::
var {usersRouter, jwtCapture} = require('./user/router')
var postRouter = require('./post/router')

app.use(jwtCapture)

app.use(usersRouter)
app.use('/p',postRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message)
  return res.json(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  if(req.method == 'POST'){
    res.json(err)
  }else{
    // render the error page
    res.render('error');
  }

});


console.log(config)


module.exports = app;
