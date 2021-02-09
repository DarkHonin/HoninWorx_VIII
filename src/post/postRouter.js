var express = require('express');
var router = express.Router();

var {postModel, md} = require('./db')
var captureObject = require('./middleware')
var ObjectId = require('mongoose').Types.ObjectId

var restSchema = require('../common/restSchema')
var {requireAdmin} = require('../user/middleware')


router.get('/', (req, res) => {
    postModel.find({}).populate('media').then(els => {
        res.render('list', {list : els, listType : 'inline', type : 'post', title : 'Posts:'})
    })
})

router.get('/create', requireAdmin, (req, res, next) => {
    res.render('posts/edit', {ObjectId})
})

router.post('/create', requireAdmin, restSchema({
    id : {
        test : ObjectId.isValid,
        type : ObjectId
    },
    title : String,
    content : String,
}), (req, res, next) => {
    let _ = req.body
    new postModel({_id : _.id, title : _.title, content : _.content}).save().then(d => {
        console.log(d)
        res.json(d)
    })
})

router.post('/markdown', requireAdmin,  (req, res, next) => {
    res.json({payload : md.render(req.body.md)})
})

router.get('/:postID', captureObject('postID', postModel, {populate : 'media'}), (req, res, next) => {
    if(!res.focus) return res.json({status: 0, messahge :`Invalid post ID: ${oid}`})
    res.render('posts/post', {focus : res.focus, list : res.focus.media, listType: 'inline', type: 'media'})
})

router.get('/:postID/e', requireAdmin, captureObject('postID', postModel, {populate : 'media'}), (req, res, next) => {
    if(!res.focus) return res.json({status: 0, messahge :`Invalid post ID: ${oid}`})
    
    res.render('posts/edit', {focus : res.focus, list : res.focus.media, listType: 'inline', type: 'media'})
})

// router.use('/:postID/e', requireAdmin, captureObject('postID', postModel, {populate : 'media'}), adminRouter('posts/edit'))


module.exports = router