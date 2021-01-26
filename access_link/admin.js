const {abstractUserModel} = require('../user/db')
const crypto = require('crypto')

async function createUser(username, password, role = 'visitor'){
    return new Promise((resolve, reject) => 
    {
        var anonID = crypto.createHash('sha256').update(crypto.randomBytes(46)+'.'+process.env.tg_bot_token).digest().toString('hex')
        abstractUserModel.custom({username, password, meta : {
            anonID
        }, role}).then(user => {
            resolve( {
                'url' : `http://honinworx.co.za/link/${user.meta.anonID}`,
                password
            })
        })

    }
    )

}



module.exports = {createUser}