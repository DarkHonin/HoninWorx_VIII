function requireAdmin(req, res, next) {
    var identity = res.jwt.user.body
    console.log(identity)
    if(!identity) return res.redirect('/u/login')
    if(identity.role != 'admin') return next('User role not met: INVALID_PREMISION')
    next()
}

function requireUser(req, res, next){
    var identity = res.jwt.user.body
    if(!identity) return res.redirect('/u/login')
    if(identity.role != 'user' && identity.role != 'admin') return next('User role not met: INVALID_PREMISION')
    next()
}


module.exports = {requireUser, requireAdmin}