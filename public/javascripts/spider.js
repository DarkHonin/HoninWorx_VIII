async function Spider(base, structure){
    // console.log(base, typeof(structure))
    return new Promise((yay, nay) => {

        var ret = {}
        if(typeof(structure) === 'string')
            ret[structure] = document.querySelector(`${base} .${structure}`)
        else
            Object.keys(structure).forEach(async key => {
                var value = structure[key]
                // console.log(`${base} - ${key} - ${value}`)
                if(typeof(value) === 'string')
                    ret[value] = document.querySelector(`${base} .${value}`)
                else{
                    // console.log(key)
                    if(isNaN(key))
                        ret[key] = await Spider(`${base} .${key}`, value)
                    else{
                        var nc = await Spider(`${base}`, value)
                        Object.keys(nc).forEach(n => ret[n] = nc[n])
                    }
                    // Object.keys(element).forEach(k => (typeof(k) === 'string') ? ret[k] = element[k] : '' )
                }
            })
        // console.log(ret)
        return yay(ret)
    })
}