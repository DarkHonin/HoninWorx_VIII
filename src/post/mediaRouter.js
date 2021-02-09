var express = require('express');
var router = express.Router();
var {mediaModel} = require('./db')
var captureObject = require('./middleware')
var restSchema = require('../common/restSchema')
var adminRouter = require('./adminRouter')


router.get('/', (req, res) => {
    mediaModel.find({}).then(els => {
        res.render('list',  {list : els, listType : 'inline', type : 'media', title : "All Media:"})
    })
})

const mediaAdmin = express.Router({mergeParams: true})

mediaAdmin.get('/create', (req, res) => {
    if(!res.focus){
        res.render('posts/mediaUpload')
    }
        
})

mediaAdmin.post('/create', (req, res) => {
    res.redirect(307, `https://api.imgbb.com/1/upload?key=${process.env.imgdd_key}`)
})

mediaAdmin.post('/:mediaID/u', (req, res) => {
    if(req.params['mediaID'] === 'create'){
        new mediaModel(req.body).save().then(m => {
            res.json(m)
        })
    }else{
       Object.assign(res.focus, req.body)
       res.focus.save().then(j => res.json(j))
    }
})


router.get('/:mediaID', captureObject('mediaID', mediaModel), (req, res) => {
    
    res.render('posts/media', {focus : res.focus})
})


router.use('/', mediaAdmin)

module.exports=router