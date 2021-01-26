
function requireIdentity(getIdentity){
    return (req, res) =>{
        const identity = getIdentity(req, res)
        if(!identity) res.end(403)
    }
}