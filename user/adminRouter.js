
var express = require('express');
var adminRouter = express.Router();
var {userModel, roles} = require('./db')
const {requireAdmin} = require('./middleware')

adminRouter.use(requireAdmin)

adminRouter.get('/', (req, res)=>{
    userModel.find({}).then((ds) => {
        res.render('user/list', {currentUser : res.jwt.user.body, users : ds, roles})
    })
})

adminRouter.post('/create_user', (req, res)=>{
    userModel.createUser({username : req.body.uname, password : req.body.pword, role : req.body.role}).then((d) => {
        res.json(d.identity())
    })
})

adminRouter.get('/:userID', (req, res) => {
    userModel.findById(req.params.userID).catch(err=>res.json({status: 0, message : err})).then(d => {
        res.render('user/index', {user : d.identity(), currentUser : res.jwt.user.body})
    })
})

module.exports = {adminRouter}