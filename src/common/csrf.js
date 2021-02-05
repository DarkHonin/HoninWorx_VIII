var csrf = require('csurf')
const csrfProtection = csrf({ cookie: true, value : req => req.body.csrf_token })

module.exports = csrfProtection