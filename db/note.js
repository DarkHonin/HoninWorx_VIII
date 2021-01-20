var mongoose = require('mongoose')
const db = mongoose.connection

const noteSchema = new mongoose.Schema({
    title: String,
    body : String
  }, { timestamps: true });

const noteModel = mongoose.model('Note', noteSchema)

module.exports = {noteSchema, noteModel}