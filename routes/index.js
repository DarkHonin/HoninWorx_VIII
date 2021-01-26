var express = require('express');
var router = express.Router();
var oid = require('mongoose').Types.ObjectId
var project = require('../db/project').projectModel
var {roles} = require('../user/db')
var {getQuery, markdown} = require('./edit')
var {jwtMiddleware} = require('../common/jwt')
var md = markdown

const methods = {
                markdown : (data) => md.render(data), 
                findById : (id, set) => set.find((v, k) => id == v._id)
              }

/* GET home page. */
router.use(getQuery).use(jwtMiddleware('user')).get('/', function(req, res, next) {
  console.log("JWT: ",res.jwt)
  const query = res.searchQuery 
  if(!res.jwt.user)
    res.render('auth_wall')
  else
    Promise.all([
      project.find(query[1], {title : 1, _id : 1}, { sort: { 'updatedAt' : -1}}),
      query[0]._id ? project.findOne(query[0], {...query[0]['posts._id'] ? {'posts.$' : 1} : undefined}) : undefined,
      query[0]._id ? project.findOne(query[0], {posts: 1}) : undefined,
    ]).catch(err => {
      throw err
    }).then( ([ _projects, focus, pages ]) => {
      res.render('index_2', { "projects" : _projects, 
                                focus : focus ? (focus.title ? focus : focus.posts[0]) : undefined, 
                                methods, 
                              query : {
                                project : query[0]._id,
                                page : query[0]['posts._id']
                              },
                              pages : pages ? pages.posts : undefined,
                              edit : process.env.edit,
                              user :  res.jwt.user.body,
                              roles
                            });
    });
});


module.exports = router;
