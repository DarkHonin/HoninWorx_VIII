

module.exports = (schema) => {
    
    return (req, res, next) =>{
        console.log(schema)
        var schemaFields = Object.keys(schema)
        var body = req.body

        var missing = false
        var valid = false
        
        schemaFields.forEach(e =>{
            var type = schema[e].type ? typeof(schema[e].type()) : typeof(schema[e]())
            var required = schema[e].required
            if(!required && !body[e])
                return
            var _enum = schema[e].enum
            
            var test = schema[e].test


            missing = (!required && !body[e])
            valid = test ? test(body[e]) : typeof(body[e]) === type
            var val = body[e]
            if(_enum)
                console.log(_enum, _enum.includes(val), val)
            if(_enum && !_enum.includes(body[e])) return  next({status : 0, message : `Invalid enum: ${e} : ${body[e]}`})

            if(missing) return next({status : 0, message : `Paramater is missing: ${e}`})
            if(!valid) return next({status : 0, message : `Invalid paramater: ${e}`})
        })
        
        if(missing | !valid) return
        next()
    }
}