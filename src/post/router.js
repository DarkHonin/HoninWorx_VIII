var express = require('express');
var router = express.Router();

var mediaRouter = require('./mediaRouter')
var postRouter = require('./postRouter')

router.use('/m', mediaRouter)
router.use('/p', postRouter)



module.exports = router