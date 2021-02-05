var express = require('express');
var userRouter = express.Router();
var {userModel, roles} = require('./db')
const {jwtMiddleware, setJWT, clearJWT} = require('../common/jwt')
const {requireUser, requireAdmin} = require('./middleware')
var csrf = require('../common/csrf')

const captchaUrl = '/captcha.jpg';
const captchaMathUrl = '/captcha_math.jpg';
const captchaSessionId = 'captcha';
 
const captcha = require('svg-captcha-express').create({
    cookie: captchaSessionId
});
 
userRouter.get(captchaUrl, captcha.image());
 
userRouter.get(captchaMathUrl, captcha.math());

userRouter.get('/logout', (req, res) => {
    clearJWT(res, 'user')
    res.redirect('/')
})

userRouter.get('/login', csrf, (req, res) => {
    if(res.jwt.user)
        return res.redirect(req.header('Referer'))
    else
        return res.render('user/login', {captcha : {name : 'captcha', url : '/u'+captchaUrl}, token : req.csrfToken()})
})


userRouter.post('/login', csrf , (req, res) => {
    var {username, password} = req.body
    if(!captcha.check(req, req.body['captcha'])){
        res.json({status : false, error : "INVALID_CAPTCHA", message : "Invalid captcha"})
    }else
    userModel.findOne({uname : username}).then(user => {
        if(!user) throw res.json({'status' : false, error : "INVALID_CRED", message : "Invalid username/password"})
        else user.login(password).then(login => {
            if(!login)
                throw res.json({'status' : false,error : "INVALID_CRED", message : "Invalid username/password"})
            else{
                setJWT(res, 'user', user.identity())
                res.json({'status' : 1})
            }
        })
    })
})

userRouter.get('/', requireUser,  (req, res) => {
    res.render('user/index', {user : res.jwt.user.body, currentUser : res.jwt.user.body})
})


module.exports = {userRouter}
