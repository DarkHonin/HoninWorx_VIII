const mongoose = require('mongoose')
mongoose.set('debug', true);
module.exports = () => 
  mongoose.connect(process.env['db_srv'], {useNewUrlParser: true});