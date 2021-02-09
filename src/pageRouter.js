var express = require('express');
var router = express.Router({mergeParams : true});

router.get('/', (req, res) => {
    console.log(req.user)
    res.render('template/index')
})

module.exports = router