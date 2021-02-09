var express = require('express');
var captchaRouter = express.Router();

const captchaUrl = '/captcha.jpg';
const captchaMathUrl = '/captcha_math.jpg';
const captchaSessionId = 'captcha';
const captchaFieldName = 'captcha';
 
const captcha = require('svg-captcha-express').create({
    cookie: captchaSessionId
});
 
captchaRouter.get(captchaUrl, captcha.image());
 
captchaRouter.get(captchaMathUrl, captcha.math());

var captchaMiddleware = function (req, res, next) {
    if(req.method == "GET")
        res.locals.captcha = {name : captchaFieldName, url : captchaUrl}
    else if (req.method== "POST"){
        console.log(req.session)
        console.log("Capcha check: "+req.body[captchaFieldName])
        if(!captcha.check(req, req.body[captchaFieldName])) 
            return next({status : false, error : "INVALID_CAPTCHA", message : "Invalid captcha"})
    }
    next()
}

module.exports = {captchaRouter, captchaMiddleware}