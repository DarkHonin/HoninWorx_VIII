var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var express = require('express');
var router = express.Router();

var {captchaRouter, captchaMiddleware} = require('../common/captcha')
var {csrfProtection} = require('../common/csrf')

var {userModel} = require('./db')

var userCreate = require('./userCreate')

passport.use(new LocalStrategy(
  function(username, password, done) {
    userModel.findOne({ displayName: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.login(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
    
      return done(null, user.identity());
    });
  }
));



passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
  });
  
passport.deserializeUser(function(userIdentity, done) {
    var idJson = JSON.parse(userIdentity)
    done(null, idJson);
});

router.use('/', captchaRouter)


router.get('/login', captchaMiddleware, csrfProtection, (req, res) => {
    res.locals.csrf_token = req.csrfToken()
    return res.render('user/login')
})

router.post('/login', captchaMiddleware, csrfProtection, passport.authenticate('local', {failWithError : (err) => {res.json(err)}}), (req, res) => {
    if(!req.user) res.json({message : "User login was unsucsessful"})
    else res.json({status : 1, u : req.user})
})

router.get('/logout', (req, res)=>{
    req.logout()
    res.redirect('/')
})


router.use('/u', userCreate)

module.exports = {userRouter: router, passport}