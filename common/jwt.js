/**
 * A simple JWT implementation
 * 
 * #Enviroment Variables 
 *      -   JWT_token ~ some hash for your tokens
 * 
 * setJWT(      ExpressResponce res, String cookieName, Object data )           ~   Sets the web token cookie as `cookieName` with the payload of base64(json(`data`)) to the express respoce object
 * getJWT(      ExpressRequest req, String cookieName )                         ~   Attempts to get then decode the payload at `cookieName` under req
 *                                                                                      if succsess: 
 *                                                                                          returns {head, body, hash, predigest};                  ~ All arguments are String atm !!! Not verified !!!
 *                                                                                      else: 
 *                                                                                          returns false
 *                                                                          
 * verifyJWT(   ExpressRequest req, String cookieName )                         ~   Attempts to get the cookie, proceeds to validate on a hmac? sha256 thingy and returns the jwt object if successful. else false
 * renewJWT(    ExpressRequest req, ExpressResponce res, String cookieName )    ~   Validates the existing cookie before setting it anew
 */

const base64url = require('base64url')
const crypto = require("crypto")

function setJWT(res, cookieName, data){
    const secretHash = crypto.createHash('sha256').update(process.env.jwt_token).digest()
    var cookie = [
        base64url(Buffer.from(JSON.stringify({
            'alg' : 'sha256',
            'typ' : 'jwt'
        })).toString()),
        Buffer.from(JSON.stringify(data)).toString('base64')
    ]
    const dataHash = crypto.createHmac('sha256', secretHash).update(JSON.stringify(cookie)).digest('hex')
    cookie.push(dataHash)
    
    var cookieContent = cookie.join('.')
    res.cookie(cookieName, cookieContent, { maxAge: 900000, httpOnly: true });
}

function clearJWT(res, cookieName){
    res.cookie(cookieName, null, {maxAge: 0})
}

function getJWT(req, cookieName){
    const cookie = req.cookies[cookieName]
    if(!cookie) return false
    
    var parts = cookie.split('.')
    if(parts.length < 3) return false
    var hash = parts.pop()
    return {head : base64url.decode(parts[0]), body : JSON.parse(Buffer.from(parts[1], 'base64').toString('ascii')), hash, predigest : JSON.stringify(parts)}
}

function verifyJWT(req, cookieName){
    const jwt = getJWT(req, cookieName)
    if(!jwt) return false
    var storedHash = jwt.hash
    var secretHash = crypto.createHash('sha256')
        .update(process.env.jwt_token)
        .digest()
    var dataHash = crypto.createHmac('sha256', secretHash)
        .update(jwt.predigest)
        .digest('hex')
    if( dataHash === storedHash)
        return jwt
    return false
    
}

function renewJWT(req, res, cookieName ){
    var jwt = verifyJWT(req, cookieName)
    if(!jwt) return false
    setJWT(res, cookieName, JSON.parse(jwt.body))
    return true
}

function jwtMiddleware(cookieName){
  return (req, res, next) => {
    if(!res.jwt) res.jwt = {[cookieName] : verifyJWT(req, cookieName)}
    else res.jwt[cookieName] = verifyJWT(req, cookieName)
    next()
}
}


module.exports ={setJWT, verifyJWT, jwtMiddleware, renewJWT, clearJWT}