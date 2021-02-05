var {ObjectId} = require('mongoose').Types

module.exports = (paramater, model, options ={populate : undefined}) => {
    return (req, res, next) => {
        var oid = req.params[paramater]
        if(oid && ObjectId.isValid(oid)){
            var find = model.findById(oid)
            Object.keys(options).forEach(k=>{
                if(k == 'populate') find = find.populate(options[k])
            })
            
            find.then((d) => {
                if(!d) return res.json({status: 0, messahge :`Invalid post ID: ${oid}`})
                res.focus = d
                next()
            })
        }else
            next()
    }
}