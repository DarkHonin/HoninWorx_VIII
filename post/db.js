
var mongoose = require('mongoose')
const db = mongoose.connection

var MarkdownIt = require('markdown-it')
var markdownItAttrs = require('@gerhobbelt/markdown-it-attrs');

const md = new MarkdownIt().use(markdownItAttrs, {
    // optional, these are default options
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowedAttributes: ['id', 'class',]
})

const mediaSchema = new mongoose.Schema({
    type : {type: String, enum : ['img', 'video'] },
    title : String,
    thumbnail : String
  }, { timestamps: true });

const mediaModel = mongoose.model('Media', mediaSchema)

const postSchema = new mongoose.Schema({
    title : {type : String, required : true, unique : true},
    content : String,
    media : [
        {type : mongoose.Types.ObjectId, ref : "Media"}
    ]
  }, { timestamps: true });

postSchema.methods.markdown = function(){
    if(!this.content)
        return "### NO cONTENt"
    return md.render(this.content)
}


postSchema.methods.createdTimeStamp = function(){
    var date = new Date(this.createdAt)
    return date.toLocaleDateString()
}

postSchema.methods.updatedTimeStamp = function(){
    var date = new Date(this.updatedAt)
    return date.toLocaleDateString()
}

const postModel = mongoose.model('Posts', postSchema)


const projectSchema = new mongoose.Schema({
    post : {type : mongoose.Types.ObjectId, ref : "Posts"},
    children : [
        {type : mongoose.Types.ObjectId, ref : "Posts"}
    ],
    meta : {}
  }, { timestamps: true });


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

module.exports = {projectModel, postModel, mediaModel, md}