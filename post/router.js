var express = require('express');
var router = express.Router();
var {ObjectId} = require('mongoose').Types
var {postModel, md} = require('./db')

var adminRouter = require('./adminRouter')
var {requireAdmin} = require('../user/middleware')

router.use('/a', requireAdmin, adminRouter)
router.get('/', (r, q, n)=> q.redirect('list'))

router.get('/list', (req, res) => {
    postModel.find({}).then(els => {
        res.render('posts/list', {list : els})
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


module.exports = router