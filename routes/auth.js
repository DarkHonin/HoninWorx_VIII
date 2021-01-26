var express = require('express');
var authRouter = express.Router();
var {userModel, verify} = require('../db/tg_user')
const config = require('../common/config')

function tg_auth_middleware(req, res, next){
    res.user = undefined
    if(req.cookies['tg_user'] && config.e_login){
        var data = JSON.parse(req.cookies['tg_user'])
        if(!verify(data)) return next()
        userModel.findOne({uid : data.id}).then(e=>{
            if(e)
              res.user = e
            next()
          })
    }else
      next()
}


authRouter.post('/', (req, res)=> {
    const data = req.body.user

  if(!data) return res.sendStatus(500)
  if(!verify(data)) res.json({message : 'Invalid signature', status: false})
  userModel.findOne({uid : data.id}).then(e=>{
    if(!e)
      new userModel({uid : data.id, uname : data.username}).save().then(r => res.json({status: 1}))
    else
      res.json({status: 1})
  })
})

module.exports = {authRouter, tg_auth_middleware}