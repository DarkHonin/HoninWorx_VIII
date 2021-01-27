

var mongoose = require('mongoose')
const db = mongoose.connection

const mediaSchema = new mongoose.Schema({
    title: String,
    type : String,
    path : String,
    meta : Object
  }, { timestamps: true });

// const mediaModel = mongoose.model('Media', mediaSchema)

module.exports = {mediaSchema}