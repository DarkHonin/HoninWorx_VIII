const mediaUpload = Spider('#mediaUpload', {
    ...['title',
    'upload',
    'file',
    'preview'],
    meta : [
        'filename',
        'size',
        'mime'
    ]
}).then(mu => {
    const payload = {
        name : undefined,
        image : undefined,
        title : undefined
    }
    mu.file.addEventListener('input', (e) => {
        if(!mu.file.files) return
        let file = mu.file.files[0]

        var reader = new FileReader()
        reader.onload = (r) => {
            payload.image = mu.preview.src = r.target.result
            payload.image = payload.image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "")
            if(!mu.title.value) mu.title.value = file.name
            
            payload.name = mu.meta.filename.textContent = file.name
            mu.meta.size.textContent = (file.size / (1024*1024)).toFixed(2) + ' MB'
            mu.meta.mime.textContent = file.type
        }
        reader.readAsDataURL(file)
    })

    mu.upload.addEventListener('click', (e) => {
        payload.title = mu.title.value
        if(!payload.title) return alert('A title is required')
        if(!payload.image) return alert('Please select a file')
        commonNet.fetchForm_middleware('/m/create', payload).then(j => {
            let data = j.data
            commonNet.fetch_middleware('/m/create/u', {
                title : payload.title,
                thumbnail : data.thumb.url,
                url : data.display_url,
                meta : {
                    src : data.url,
                    filename : data.title,
                    delete : data.delete_url
                }
            })
        })
    })
})



