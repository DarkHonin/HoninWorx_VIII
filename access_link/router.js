var express = require('express');
var linkRouter = express.Router();
var {abstractUserModel} = require('../user/db')
const {setJWT, jwtMiddleware} = require('../common/jwt')

const config = require('../common/config')

linkRouter.use(jwtMiddleware('user'))

var {createUser} = require('./admin')

linkRouter.get('/test', (req, res)=>{
    createUser('Admin 1', 'password', 'admin').then(d => console.log(d)).then(res.redirect('/'))
})


linkRouter.use('/:hash', (req, res, next)=>{
    const oid = req.params.hash
    console.log('authID: ',oid)
    if(!oid) return express.sendStatus(404)
    abstractUserModel.findOne({
        'meta.anonID' : oid 
    }).then(e=> e ? res.user = e.identity() : res.user = null).then(()=>next())
})

linkRouter.get('/:hash', (req, res) => {
    if(res.jwt.user)
        res.redirect('/')
    else
        res.render('anonLogin')
})



linkRouter.post('/:hash', (req, res) => {
    
    const password = req.body.password
    console.log(res.user)
    abstractUserModel.findById(res.user._id).then(e=>{
        e.login(password).then((ok) => {
            if(ok){
                const identity = e.identity()
                console.log(identity)
                setJWT(res, 'user', identity)
                res.json({status : 1})
            }else
                res.sendStatus(403)
        })
        
        
    })
})

module.exports = {linkRouter}