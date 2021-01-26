if(process.env.dotenv){
    const dotenv = require("dotenv");
    dotenv.config();
    console.log("Using .env config")
}
module.exports = {
    e_login : process.env.enable_login==='true',
    e_edit : process.env.enable_editor==='true'
}