
var mongoose = require('mongoose')
const db = mongoose.connection
const crypto = require('crypto')

const abstractUser = {
    uname : {type: String, required : true},
    hash : String,
    meta : {},
    role : {
        type : String,
        enum : ['user', 'admin'],
        default : 'visitor'
    }
  }

const userSchema = new mongoose.Schema(abstractUser, { timestamps: true });

userSchema.methods.identity = function(){
    var object = this.toObject();
    delete object.hash
    delete object.meta
    console.log(object)
    return object
}

userSchema.methods.login = async function(password){
    return new Promise((resolve, reject) => {
        const [salt, key] = this.hash.split(":")
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'))
        });
    })
}

userSchema.statics.setPassword = async function(password){
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = crypto.randomBytes(16).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    }).then(hash => this.hash = hash).save()
}

userSchema.statics.createUser = async function({username, password, meta = {}, role}){
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = crypto.randomBytes(16).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    }).then(hash => new userModel({uname : username, hash, meta, role}).save())
}

userSchema.statics.has_admin = function(){
    return userModel.findOne({role : "admin"}).then(admin => {
        return admin && admin.role === 'admin'
    })
}

const userModel = mongoose.model('user', userSchema)

module.exports = {userSchema, userModel, roles : abstractUser.role.enum}