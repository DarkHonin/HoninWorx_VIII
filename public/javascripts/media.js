var fetch_url = (videoURL) => "http://www.youtube.com/oembed?url="+videoURL+"&format=json"

const payload = new FormData();

function component(base, structure){
    // console.log(base, typeof(structure))
    var ret = {}
    if(typeof(structure) === 'string')
        ret[structure] = document.querySelector(`${base}>.${structure}`)
    else
        Object.keys(structure).forEach(key => {
            var value = structure[key]
            // console.log(`${base} - ${key} - ${value}`)
            if(typeof(value) === 'string')
                ret[value] = document.querySelector(`${base}>.${value}`)
            else{
                // console.log(key)
                if(isNaN(key))
                    ret[key] = new component(`${base}>.${key}`, value)
                else{
                    var nc = new component(`${base}`, value)
                    Object.keys(nc).forEach(n => ret[n] = nc[n])
                }
                // Object.keys(element).forEach(k => (typeof(k) === 'string') ? ret[k] = element[k] : '' )
            }
        })
    // console.log(ret)
    return ret
}



const mediaSelector = new component('#mediaSelect', { 
    
    'img' : [
        'title',
        'file',
        {
            'meta' : [
                'name',
                'type',
                'size',
                ]
        },
        'thumbnail'
    ],
    'vid' : [
        'id'
    ],
    'buttons' : [
        'cancel',
        'submit'
    ]
})

console.log(mediaSelector)

mediaSelector.getState = () => document.querySelector('#mediaSelect>input:checked').getAttribute('value')

mediaSelector.img.thumbnail.addEventListener('click', () => mediaSelector.img.file.click())

mediaSelector.img.file.addEventListener('input', (e) => {
    var files = mediaSelector.img.file.files
    console.log(files)
    if(!(files && files[0])) return
    payload.set('img', files[0])
    payload.set('name', mediaSelector.img.meta.name.textContent = files[0].name )
    mediaSelector.img.meta.size.textContent = files[0].size/1024
    mediaSelector.img.meta.type.textContent = files[0].type


    var reader = new FileReader();
    reader.onload = (e) => {
        var hold = e.target.result
        
        mediaSelector.img.thumbnail.querySelector('img').src = hold
        payload.image = hold.replace(/^data:image\/(png|jpeg);base64,/, "");
    }
    
    reader.readAsDataURL(files[0])

})

mediaSelector.buttons.submit.addEventListener('click', () => {
    switch(mediaSelector.getState()){
        case 'vid':

        case 'img':
            commonNet.fetchForm_middleware(window.location+'/upload', payload)
    }
})


