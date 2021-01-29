var express = require('express');
var userRouter = express.Router();
var {userModel} = require('./db')
const {jwtMiddleware, setJWT, clearJWT} = require('../common/jwt')

const captchaUrl = '/captcha.jpg';
const captchaMathUrl = '/captcha_math.jpg';
const captchaSessionId = 'captcha';
const captchaFieldName = 'captcha';
 
const captcha = require('svg-captcha-express').create({
    cookie: captchaSessionId
});
 
userRouter.get(captchaUrl, captcha.image());
 
userRouter.get(captchaMathUrl, captcha.math());


userRouter.use(jwtMiddleware('user'))

userRouter.get('/', (req, res) => {
    if(res.jwt.user)
        res.render('user/index', {user : res.jwt.user.body})
    else
        res.render('user/login', {captcha : {name : captchaFieldName, url : captchaUrl}})
})

userRouter.post('/', (req, res) => {
    var {username, password} = req.body
    if(!captcha.check(req, req.body[captchaFieldName])){
        res.json({status : false, message : "Invalid captcha"})
    }else
    userModel.findOne({uname : username}).then(user => {
        if(!user) throw res.json({'status' : false, message : "invalid username/password"})
        else user.login(password).then(login => {
            if(!login)
                throw res.json({'status' : false, message : "invalid username/password"})
            else{
                setJWT(res, 'user', user.identity())
                res.json({'status' : 1})
            }
        })
    })
})

userRouter.get('/logout', (req, res) => {
    clearJWT(res, 'user')
    res.redirect('/')
})


module.exports = {userRouter}

