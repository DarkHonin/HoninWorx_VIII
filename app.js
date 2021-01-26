var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var editRouter = require('./routes/edit').router;
var db_init = require('./common/db')
var app = express();
const session = require('express-session');

var userTech = require('./user/index')

var {jwtMiddleware} = require('./common/jwt')

// Body parser
indexRouter.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
      secret: 'C0AB33339D6A58F72C654401FEFF5CA24BB785C4AB2EE02EE292D3F2C43D9339',
      resave: false,
      saveUninitialized: true
  })
);


// app.use(tg_auth_middleware)

app.use(sassMiddleware({
  src: path.join(__dirname, '/assets/sass'),
  dest: path.join(__dirname, '/public/stylesheets'),
  prefix:  '/stylesheets',
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
  debug: true
}));

app.use(express.static(path.join(__dirname, 'public')));
db_init()
userTech(app, {enable_link_login : true})


// abstractUserModel.has_admin().then(has => has ? console.log("Admin user already exists") : createUser("default_admin", 'password', 'admin')) /// Incase of lockout

const config = require('./common/config') 
app.locals.env = config

                    app.use('/', indexRouter);
if(config.e_edit)   app.use('/', editRouter);

// if(config.e_login)  app.use('/tg_auth', authRouter)

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


console.log(config)


module.exports = app;
