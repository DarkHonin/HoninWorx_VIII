
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

const abstractObject = {
    name : String,
    author : {type : mongoose.Types.ObjectId, ref : "user"}
}

const abstractMethods = {
    
    createdTimeStamp : function(){
        var date = new Date(this.createdAt)
        return date.toLocaleDateString()
    },

    updatedTimeStamp : function(){
        var date = new Date(this.updatedAt)
        return date.toLocaleDateString()
    }
}


const mediaSchema = new mongoose.Schema({
    ...abstractObject,
    type : {type: String, enum : ['img', 'video'] },
    thumbnail : {
        size : Number,
        url : String
    },
    display : {
        size : Number,
        url : String
    },
    file : {
        name : String,
        url : String,
        delete_url : String
    }
  }, { timestamps: true });

Object.assign(mediaSchema.methods, abstractMethods)

const mediaModel = mongoose.model('Media', mediaSchema)

const postSchema = new mongoose.Schema({
    ...abstractObject,
    content : String,
    media : [
        {type : mongoose.Types.ObjectId, ref : "Media"}
    ]
  }, { timestamps: true });

Object.assign(postSchema.methods, postSchema)

postSchema.methods.markdown = function(){
    if(!this.content)
        return "### NO cONTENt"
    return md.render(this.content)
}

const postModel = mongoose.model('Posts', postSchema)

module.exports = {postModel, mediaModel, md, abstract : {abstractObject, abstractObjectSchema}}