function requireAdmin(req, res, next) {
    var identity = res.jwt.user.body
    console.log(identity)
    if(!identity) return next('User role not met: NO_USER')
    if(identity.role != 'admin') return next('User role not met: INVALID_PREMISION')
    next()
}

function requireUser(){
    var identity = res.jwt.user.body
    if(!identity) return next('User role not met: NO_USER')
    if(identity.role != 'user' || identity.role != 'admin') return next('User role not met: INVALID_PREMISION')
    next()
}


module.exports = {requireUser, requireAdmin}