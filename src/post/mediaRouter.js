var express = require('express');
var router = express.Router();
var {mediaModel} = require('./db')
var captureObject = require('./middleware')
var restSchema = require('../common/restSchema')
var adminRouter = require('./adminRouter')
var {requireAdmin} = require('../user/middleware')
router.get('/', (req, res) => {


    

    mediaModel.find({}).then(els => {
        res.render('list',  {list : els, listType : 'inline', type : 'media', title : "All Media:"})
    })
})

router.get('/:mediaID', captureObject('mediaID', mediaModel), (req, res) => {
    
    res.render('posts/media', {focus : res.focus})
})

router.get('/:mediaID/d', (req, res) => {
    res.focus.delete().then((s) => {
        res.redirect('/p/m/')
    } )
})

router.use('/:mediaID/e', requireAdmin, captureObject('mediaID', mediaModel), adminRouter('posts/media', 'posts/mediaUpload'))

module.exports=router