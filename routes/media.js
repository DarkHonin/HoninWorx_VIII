var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  let sql = `SELECT * FROM media`;
  var db = require("../db/db")
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Media list: "
    })
  })
});

router.get('/:mediaID', (req, res, next) => {
  let sql = `SELECT * FROM media WHERE _id=${req.params['mediaID']}`;
  var db = require("../db/db")
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Media found: "
    })
  })
});

module.exports = router;
