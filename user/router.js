var express = require('express');
var abstractUserRouter = express.Router();
const {clearJWT} = require('../common/jwt')

abstractUserRouter.get('/logout', (req, res) => {
    clearJWT(res, 'user')
    res.redirect('/')
})

module.exports = {abstractUserRouter}

