const editor = Spider('#postEditor', {
    ...['id'],
    payload : ['title', 'content'],
    controll : ['save', 'delete', 'toggle'],
    display : ['title', 'content']
}).then(e => {
    console.log(e)
    // Markdown refresh timer
    var timer = false
    e.payload.content.addEventListener('keyup', (k) => {
        if(timer){
            clearTimeout(timer)
            timer = false
        }
        timer = setTimeout(() => {
            commonNet.fetch_middleware(`/p/markdown`, {
                md : k.payload.content.value
            }).then(data => e.display.content.innerHTML = data.payload)
        }, 1000)
    })


    // Toggle of preview & editor
    e.controll.toggle.addEventListener('click', () => {
        e.payload.root.classList.toggle('open')
    })

    // Save button
    e.controll.save.addEventListener('click', () => {
        commonNet.fetch_middleware('/p/create', {
            id : e.id.value,
            title : e.payload.title.value,
            content : e.payload.content.value
        })
    })

    return e
})


