var express = require('express');
var router = express.Router();
var {postModel, md} = require('./db')
var {ObjectId} = require('mongoose').Types

var restSchema = require('../common/restSchema')


router.get('/', (req, res) => {
    res.render('posts/edit')
})

router.get('/create', (req, res) => {
    new postModel({title : 'still untitled', content : "# pending"}).save().then(d => {
        res.redirect('/p/a/'+d._id)
    })
})

router.post('/upload', (req, res) => {
    res.redirect(307, `https://api.imgbb.com/1/upload?key=${process.env.imgdd_key}`)
})

router.post('/markdown', (req, res) => {
    res.json({payload: md.render(req.body.md)})
})


router.get('/:postID', (req, res) => {
    var oid = req.params['postID']
    console.log(oid)
    if(oid && ObjectId.isValid(oid)){
        postModel.findById(oid).then((d) => {
            if(!d) res.json({status: 0, message :`Invalid post ID: ${oid}`})
            res.render('posts/edit', {focus : d})
        })
    }else
        res.json({status: 0, message :`Invalid post ID: ${oid}`})
})

router.post('/:postID/markdown', (req, res) => {
    res.json({payload: res.target.markdown()})
})

router.post('/:postID/edit', restSchema({
    title : {
        required: true,
        type : String
    },
    content : {
        required: true,
        type : String
    }
}), (req, res) => {
    var setting = req.body
    res.target.title = setting.title
    res.target.content = setting.content
    res.target.save().then(d => res.json({status : 1, postID : d._id}))
})

module.exports=router