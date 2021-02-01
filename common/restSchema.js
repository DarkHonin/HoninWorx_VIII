

module.exports = (schema) => {
    return (req, res, next) =>{
        var schemaFields = Object.keys(schema)
        var body = req.body

        var missing = false
        var valid = false

        schemaFields.forEach(e =>{
            var type = schema[e].type ? schema[e].type : typeof(schema[e]())
            var required = schema[e].required
            var test = schema[e].test

            console.log(type)

            missing = (!required && !body[e])
            valid = test ? test(body[e]) : typeof(body[e]) === type

            if(missing) return next({status : 0, message : `Paramater is missing: ${e}`})
            if(!valid) return next({status : 0, message : `Invalid paramater: ${e}`})
        })

        if(missing | !valid) return
        next()
    }
}