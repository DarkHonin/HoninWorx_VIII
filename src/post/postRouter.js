var express = require('express');
var router = express.Router();

var {postModel, md} = require('./db')
var captureObject = require('./middleware')

var adminRouter = require('./adminRouter')
var {requireAdmin} = require('../user/middleware')



router.get('/', (req, res) => {
    postModel.find({}).populate('media').then(els => {
        res.render('list', {list : els, listType : 'inline', type : 'post', title : 'Posts:'})
    })
})

router.get('/:postID', captureObject('postID', postModel, {populate : 'media'}), (req, res, next) => {
    if(!res.focus) return res.json({status: 0, messahge :`Invalid post ID: ${oid}`})
    res.render('posts/post', {focus : res.focus, list : res.focus.media, listType: 'inline', type: 'media'})
})

router.use('/:postID/e', requireAdmin, captureObject('postID', postModel, {populate : 'media'}), adminRouter('posts/edit'))


module.exports = router