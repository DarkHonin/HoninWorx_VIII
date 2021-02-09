
var mongoose = require('mongoose')
const db = mongoose.connection
const crypto = require('crypto')

const abstractUser = {
    displayName : {type: String, required : true},
    hash : String,
    meta : {
        provider : {
            type : String,
            enum : ['local']
        },
        id : mongoose.Types.ObjectId
    },
    admin : Boolean
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

function hashPassword(password){
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = crypto.randomBytes(16).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
        
    })
}

userSchema.methods.setPassword = async function(password){
    console.log(this.hash)
    this.hash = await hashPassword(password)
    console.log(this.hash)
}

userSchema.statics.createUser = async function({username, password, meta = {provider : 'local', id : new mongoose.Types.ObjectId()}, admin=false}){
    var model = new userModel({displayName : username, meta, admin})
    return model.setPassword(password).then(() => model.save())
}

const userModel = mongoose.model('user', userSchema)

module.exports = {userSchema, userModel}