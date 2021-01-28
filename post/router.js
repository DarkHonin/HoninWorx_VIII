var express = require('express');
var router = express.Router();
var {ObjectId} = require('mongoose').Types
var {postModel, md} = require('./db')

router.get('/', (req, res) => {
    res.render('posts/edit', {focus : new postModel({title : "demo", content : "# THIS IS a HEADER"})})
})

router.get('/list', (req, res) => {
    postModel.find({}).then(els => {
        res.render('posts/list', {list : els})
    })
})

router.post('/', (req, res) => {
    new postModel(req.body).save().catch(err => {
        res.json({status : 0, message : err})
        res.end()
    }).then(e=>{
        res.json({status : 1, postID : e._id})
    })
})



router.use('/:postID', (req, res, next) => {
    var oid = req.params['postID']
    if(oid && ObjectId.isValid(oid)){
        postModel.findById(oid).then((d) => {
            if(!d) res.json({status: 0, messahge :`Invalid post ID: ${oid}`})
            res.target = d
            next()
        })
    }else
        res.json({status: 0, messahge :`Invalid post ID: ${oid}`})
})

router.post('/:postID/markdown', (req, res) => {
    res.json({payload: md.render(req.body.md)})
})

router.get('/:postID', (req, res) => {
    res.render('posts/post', {focus : res.target})
})

router.get('/:postID/edit', (req, res) => {
    res.render('posts/edit', {focus : res.target})
})

router.post('/:postID/edit', (req, res) => {
    var setting = req.body
    console.log(setting)
    res.target.title = setting.title
    res.target.content = setting.content
    console.log(res.target)
    res.target.save().then(d => res.json({status : 1, postID : d._id}))
})

module.exports = router