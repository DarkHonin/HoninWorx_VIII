var mongoose = require('mongoose')
const db = mongoose.connection
const media = require('./media').mediaSchema

const postSchema = new mongoose.Schema({
    title: String,
    note : {type: String, default: "# project_note"},
    media : [media]
  }, { timestamps: true });

postSchema.methods.createdTimeStamp = function(){
    var date = new Date(this.createdAt)
    return date.toLocaleDateString()
}
postSchema.methods.updatedTimeStamp = function(){
    var date = new Date(this.updatedAt)
    return date.toLocaleDateString()
}
var MarkdownIt = require('markdown-it')
const md = new MarkdownIt();

postSchema.virtual('note_md').get(function(){
  return md.render(this.note)
})

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

const postModel = mongoose.model('Post', postSchema)

module.exports = {postSchema, postModel}