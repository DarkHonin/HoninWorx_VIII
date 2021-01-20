var mysql = require('mysql')
const dotenv = require("dotenv");
// if(dotenv)
dotenv.config();

const mongoose = require('mongoose')
mongoose.set('debug', true);
module.exports = () => 
  mongoose.connect(process.env['db_srv'], {useNewUrlParser: true});