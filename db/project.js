

var mongoose = require('mongoose')
var post = require('./post').postSchema
const db = mongoose.connection

const projectSchema = new mongoose.Schema({
    title: String,
    note : {type: String, default: "# project_note"},
    posts : {
        type : [post],
        default : []
    },
    published : {
        type : Boolean,
        default : false
    }
  }, { timestamps: true });

var MarkdownIt = require('markdown-it')
const md = new MarkdownIt();

projectSchema.virtual('note_md').get(function(){
    return md.render(this.note)
})

projectSchema.methods.createdTimeStamp = function(){
    var date = new Date(this.createdAt)
    return date.toLocaleDateString()
}

projectSchema.methods.updatedTimeStamp = function(){
    var date = new Date(this.updatedAt)
    return date.toLocaleDateString()
}

// projectSchema.set('toObject', { virtuals: true });
// projectSchema.set('toJSON', { virtuals: true });

const projectModel = mongoose.model('Project', projectSchema)

module.exports = {projectSchema, projectModel}