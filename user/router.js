var express = require('express');
var userRouter = express.Router();
var {userModel, roles} = require('./db')
const {jwtMiddleware, setJWT, clearJWT} = require('../common/jwt')
const {requireUser, requireAdmin} = require('./middleware')


const urlPrefix = '/u'

const captchaUrl = '/captcha.jpg';
const captchaMathUrl = '/captcha_math.jpg';
const captchaSessionId = 'captcha';
const captchaFieldName = 'captcha';
 
const captcha = require('svg-captcha-express').create({
    cookie: captchaSessionId
});
 
userRouter.get(captchaUrl, captcha.image());
 
userRouter.get(captchaMathUrl, captcha.math());

userRouter.get('/logout', (req, res) => {
    clearJWT(res, 'user')
    res.redirect('/')
})

userRouter.use(jwtMiddleware('user'))


userRouter.get('/', (req, res) => {
    if(res.jwt.user)
        res.render('user/index', {user : res.jwt.user.body, currentUser : res.jwt.user.body})
    else
        res.render('user/login', {captcha : {name : captchaFieldName, url : urlPrefix+captchaUrl}})
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

userRouter.use(requireAdmin).get('/list', (req, res)=>{
    userModel.find({}).then((ds) => {
        res.render('user/list', {currentUser : res.jwt.user.body, users : ds, roles})
    })
})

userRouter.use(requireAdmin).post('/list', (req, res)=>{
    userModel.createUser({username : req.body.uname, password : req.body.pword, role : req.body.role}).then((d) => {
        res.json(d.identity())
    })
})

userRouter.use(requireAdmin).get('/:userID', (req, res) => {
    userModel.findById(req.params.userID).catch(err=>res.json({status: 0, message : err})).then(d => {
        res.render('user/index', {user : d.identity(), currentUser : res.jwt.user.body})
    })
})


module.exports = {userRouter}

