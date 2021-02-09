var express = require('express');
var router = express.Router();

var {csrfProtection} = require('../common/csrf')

var {userModel} = require('./db')
var restSchema = require('../common/restSchema');
const { ObjectId } = require('mongoose').Types;

router.use((req, res, next) => {
    if(!req.user) return res.redirect(401, '/login')
    next();
})

router.get('/', (req, res)=>{
    userModel.find({}).then(els => {
        res.render('list', {list : els, listType : 'inline', type : 'user', title : 'Posts:'})
    })
})

router.get('/create', csrfProtection, (req, res) => {
    res.locals.csrf_token = req.csrfToken()
    res.render('user/form')
})

router.get('/:userID', csrfProtection, (req, res) => {
    userModel.findById(req.params['userID']).then(d => {
        if(!d) res.redirect('/u')
        res.locals.csrf_token = req.csrfToken()
        res.render('user/form', {target : d.identity()})
    })
})

router.post('/', csrfProtection, restSchema({
    username : {type : String},
    password : {type : String},
    action : {type : String, enum : ['update', 'create', 'delete']},
    is_admin : Boolean,
    csrf_token : String,
    id : String
}), (req, res) => {
    var body = req.body
    console.log(body)
    switch(body.action){
        case 'create':
            userModel.createUser({username : body.username, password : body.password, admin : body.is_admin}).then(user => {
                res.json({status : 1, u : user.identity()})
            })
            return
        case 'update':
            if(!body.id || !ObjectId.isValid(body.id)) return res.json({status : 0, message : "Invalid/missing user ID"})
            if(body.is_admin && req.user._id == body.id) return res.json({status : 0, message : "You cannot change your own admin status"})
            userModel.findById(body.id).then(user => {
                if(!user) return res.json({status : 0, message : "Invalid/missing user ID"})
                Object.assign(user, {username : body.username, admin : body.is_admin})

                if(body.password) user.setPassword(body.password)
                user.save().then(u=> res.json({status : 1, u : u.identity()}))
            })
            return
        case 'delete':
            if(!body.id || !ObjectId.isValid(body.id)) return res.json({status : 0, message : "Invalid/missing user ID"})
            if(req.user._id == body.id) req.logout()
            userModel.deleteOne({_id : body.id}).then(d => {
                res.json({'status' : 1, u : d})
            })
            return

    }
    res.json({status : 0, message : 'NO-OP'})
})


module.exports = router