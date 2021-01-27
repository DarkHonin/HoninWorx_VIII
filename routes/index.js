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
router.get('/', (req, res) => res.render('page/index'))


module.exports = router;
