var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  let sql = `SELECT * FROM projects`;
  var db = require("../db/db")
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Project list: "
    })
  })
});

router.get('/:projectID', (req, res, next) => {
  let sql = `SELECT * FROM projects WHERE _id=${req.params['projectID']}`;
  var db = require("../db/db")
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Project found: "
    })
  })
});

module.exports = router;
