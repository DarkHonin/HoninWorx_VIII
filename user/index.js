
const {linkRouter} = require('./link_login_router')
const {userRouter} = require('./router')

/**
 * Options: 
 *      enable_link_login : false
 *      enable_telegram_login : false
 */


module.exports = (app, {enable_link_login = false}) => {
    app.use('/u', userRouter)
    if(enable_link_login){
        // console.log("Anon link router enabled")
        
    }
}