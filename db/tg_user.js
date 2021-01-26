var mongoose = require('mongoose')
const db = mongoose.connection
const crypto = require("crypto");

function verify({hash, ...data}){
    const dataString = Object.keys(data)
    .sort()
    .map(k => `${k}=${data[k]}`)
    .join('\n')
    const secretHash = crypto.createHash('sha256').update(process.env.tg_bot_token).digest()
    const dataHash = crypto.createHmac('sha256', secretHash).update(dataString).digest('hex')
    return dataHash === hash
}


const userSchema = new mongoose.Schema({
    uname : String,
    uid : Number
  }, { timestamps: true });

// const userModel = mongoose.model('user', userSchema)

module.exports = {userSchema, verify}