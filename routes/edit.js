var express = require('express');
var router = express.Router();
var oid = require('mongoose').Types.ObjectId
var project = require('../db/project').projectModel
var MarkdownIt = require('markdown-it')
var markdownItAttrs = require('@gerhobbelt/markdown-it-attrs');

const md = new MarkdownIt().use(markdownItAttrs, {
    // optional, these are default options
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowedAttributes: ['id', 'class',]
})

function getQuery(req, res, next){
    var query = [
        {},
        {}
    ]
    // Define Object Scope
    if(req.query.project && oid.isValid(req.query.project))
      query[0]._id = req.query.project
    if(req.query.page && oid.isValid(req.query.page))
      if(query[0]._id)
        query[0]['posts._id'] = req.query.page
      else
        query[0] = {}
  
    // Set search paramater
    if(req.query.search && req.query.search.match(/[a-zA-Z0-9]/i)){
      if(query[0]._id)
        query[1] = {title : {$regex : `.*${req.query.search}.*`, "$options": "ix" }} ;
    }
    res.searchQuery = query
    next()
  }

router.use(getQuery)

router.post('/create', (req, res) =>{
    const query = res.searchQuery
    const json = req.body
  
    const resp = (e) => res.json(e)
    console.log("Create query: ", query)
    if(query[0]['_id'])
      project.findOne(query[0]).then(p => {
        p.posts.push({title : 'untitled', note : '# untitled'})
        p.save().then(s => s.posts[0]._id).then(id => res.json({_id : query[0]._id, 'posts._id' : id}))
      })
    else
      new project({title : 'untitled', note : '# untitled'}).save().then(e => e._id).then(id => res.json({_id : id}))
  })
  
  router.post('/delete', (req, res) =>{
    const query = res.searchQuery
    const json = req.body
  
    const resp = (e) => res.json(e)
    console.log("Deleteing: ", query)
  
    if(!query[0]['posts._id'])
      project.deleteOne(query[0]).then(resp(query[0]))
    else
      project.findOne(query[0]).then(p => {
        p.posts.id(query[0]['posts._id']).remove()
        p.save().then(resp(query[0]))
      })
  })
  
  router.post('/', (req, res)=>{
    const query = res.searchQuery
    const json = req.body
    if(query[0]['posts._id'])
      project.updateOne(
            query[0],
            { 
                "$set": {
                    "posts.$.title": json.title,
                    "posts.$.note": json.note
                }
            },
        ).then(e => res.json(e));
    else
    project.updateOne(
      query[0],
      { 
          "$set": {
              "title": json.title,
              "note": json.note
          }
      },
  ).then(e => res.json(e));
  
    // project.findOne(query[0], {...query[0]['posts._id'] ? {'posts.$' : 1} : {posts : 0}}).then(focus => {
    //   if(!focus)
    //     return res.json({"status" : false, query})
    //   let target = focus
    //   if(query[0]['posts._id'])
    //     target = target.posts.id(query[0]['posts._id'])
    //   target.title = json.title
    //   target.note = json.note
    //   focus.update().then(e => res.json(e.toObject()))
    // })
  })

router.post("/markdown", (req, res) => {
  const reqBody = req.body
  if(!reqBody.md)
    res.sendStatus(500)
  res.json({payload : md.render(reqBody.md)})
})

  module.exports = {router, getQuery, markdown : md};