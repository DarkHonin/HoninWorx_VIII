var mysql = require('mysql')

module.exports = db = mysql.createConnection({
    host: 'ixnzh1cxch6rtdrx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: process.env['db_user'],
    password: process.env['db_password'],
    database: process.env['db_database']
  })