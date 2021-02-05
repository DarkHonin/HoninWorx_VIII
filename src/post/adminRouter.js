var express = require('express');

var {ObjectId} = require('mongoose').Types

var restSchema = require('../common/restSchema')




function adminRouter(template, create){
    var router = express.Router({mergeParams : true});

    
    router.get('/', (req, res) => {
        console.log('HECK!', req.params)
        if(create && req.params['mediaID'] === 'create'){
            res.render(create)
        }else
            res.render(template, {focus : res.focus})
    })

    router.post('/update', (req, res) => {
        Object.assign(res.focus, req.body.data)
        res.focus.save().then(e=>res.json(e))
    })

    router.post('/delete', (req, res) => {
        res.focus.delete().then(e=>res.json(e))
    })

    return router
}


// router.get('/create', (req, res) => {
//     new postModel({title : 'still untitled', content : "# pending"}).save().then(d => {
//         res.redirect('/p/a/'+d._id)
//     })
// })

// router.post('/upload', (req, res) => {
//     res.redirect(307, `https://api.imgbb.com/1/upload?key=${process.env.imgdd_key}`)
// })

// router.post('/markdown', (req, res) => {
//     console.log("MARKDOWN")
//     res.json({payload: md.render(req.body.md)})
// })

// router.post('/:postID/media', restSchema({
//     thumbnail : {
//         required: true,
//         type : String
//     },
//     display : {
//         required: true,
//         type : String
//     },
//     delete : {
//         required: true,
//         type : String
//     },
//     url : {
//         require : true,
//         type : String,
//     },
//     title : {
//         required: true,
//         type : String
//     },
// }), (req, res) => {
//     var data = req.body
//     console.log(data)
//     postModel.findById({_id : req.params['postID']}, {media : 1}).then(p => {
//         new mediaModel({
//             title : data.title,
//             thumbnail : data.thumbnail,
//             url : data.display,
//             meta : {
//                 src : data.url,
//                 delete : data.delete
//             },
//             type: 'img'
//         }).save().then((m) => {
//             p.media.push(m)
//             p.save().then((r) => res.json({status : 1, r}))
//         })
//     })
// })


// router.get('/:postID', (req, res) => {
//     var oid = req.params['postID']
//     if(oid && ObjectId.isValid(oid)){
//         postModel.findById(oid).populate('media').then((d) => {
//             console.log(d)
//             if(!d) return res.json({status: 0, message :`Invalid post ID: ${oid}`})
//             res.render('posts/edit', {focus : d})
//         })
//     }else
//         res.json({status: 0, message :`Invalid post ID: ${oid}`})
// })


// router.post('/:postID/edit', restSchema({
//     title : {
//         required: true,
//         type : String
//     },
//     content : {
//         required: true,
//         type : String
//     }
// }), (req, res) => {
//     var setting = req.body
//     postModel.updateOne({_id : req.params['postID']}, {$set : {title : setting.title, content : setting.content}}).then( postModel.findOne({_id : req.params['postID']}, {updatedAt : 1}).then(d => res.json({status : 1, d})) )
// })

module.exports=adminRouter