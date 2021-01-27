var express = require('express');
var router = express.Router();
var {ObjectId} = require('mongoose').Types
var {postModel, md} = require('./db')

router.get('/', (req, res) => {
    res.render('edit', {focus : new postModel({title : "demo", content : "# THIS IS a HEADER"})})
})

router.get('/list', (req, res) => {
    postModel.find({}).then(els => {
        res.render('list', {list : els})
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

router.post('/markdown', (req, res) => {
    res.json({payload: md.render(req.body.md)})
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

router.get('/:postID', (req, res) => {
    res.render('post', {focus : res.target})
})

router.get('/:postID/edit', (req, res) => {
    res.render('edit', {focus : res.target})
})

router.post('/:postID', (req, res) => {
    var setting = req.body
    res.target.title = setting.title
    res.target.content = setting.content

    res.target.save().then(d => res.json({status : 1, postID : d._id}))
})

module.exports = router