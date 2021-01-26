
var mongoose = require('mongoose')
const db = mongoose.connection
const crypto = require('crypto')


const roles = {
    visitor : ['view'],
    admin : ['view', 'edit']
}

var can = (user, action) => {
    console.log(user)
    return roles[user.role].includes(action)
}

roles.can = can

const abstractUser = {
    uname : {type: String, required : true},
    hash : String,
    meta : {},
    role : {
        type : String,
        enum : ['visitor', 'admin'],
        default : 'visitor'
    }
  }

const abstractUserSchema = new mongoose.Schema(abstractUser, { timestamps: true });

abstractUserSchema.methods.identity = function(){
    var object = this.toObject();
    delete object.hash
    delete object.meta
    console.log(object)
    return object
}

abstractUserSchema.methods.login = async function(password){
    return new Promise((resolve, reject) => {
        const [salt, key] = this.hash.split(":")
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'))
        });
    })
}

abstractUserSchema.statics.custom = async function({username, password, meta = {}, role}){
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = crypto.randomBytes(16).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    }).then(hash => new abstractUserModel({uname : username, hash, meta, role}).save())
}

abstractUserSchema.statics.has_admin = function(){
    return abstractUserModel.findOne({role : "admin"}).then(admin => {
        return admin && admin.role === 'admin'
    })
}

const abstractUserModel = mongoose.model('user', abstractUserSchema)

module.exports = {abstractUserSchema, abstractUserModel, roles}