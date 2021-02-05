const editor = document.querySelector("#edit")
const noteEdit = document.querySelector("#edit textarea")
const titleEdit = document.querySelector("#edit .title")

const _display = document.querySelector("#display")
const notePreview = document.querySelector("#display .body")
const titlePreivew = document.querySelector("#display .title")

const save = document.querySelector("#save")
const del = document.querySelector("#delete")
const create_post = document.querySelector("#newPost")
const togglePreview = document.querySelector("#togglePreview")

var timer = false
noteEdit.addEventListener('keyup', e => {
    if(timer){
        clearTimeout(timer)
        timer = false
    }
    timer = setTimeout(() => {
        console.log(e.target.value)
        commonNet.fetch_middleware(`/p/a/markdown`, {md : noteEdit.value}).then(data => notePreview.innerHTML = data.payload)
    }, 500)
})

var titleTimer = false

titleEdit.addEventListener('keyup', e => {
    if(titleTimer){
        clearTimeout(titleTimer)
        titleTimer = false
    }
    titleTimer = setTimeout(() => {
        titlePreivew.innerHTML = e.target.value
    }, 500)
})


save.addEventListener("click", (e) => {

    var data = {        
        title : titleEdit.value, 
        content : noteEdit.value
    }

    commonNet.fetch_middleware(window.location+'/edit', data)//.then(window.location = window.location)
}, false)

create_post.addEventListener('click', (e) => {
    var data = {
        title : titleEdit.value,
        content : noteEdit.value
    }
    commonNet.fetch_middleware(window.location, data).then( j => window.location = `/p/${j.postID}`)
})

del.addEventListener('click', (e) => {
    commonNet.fetch_middleware(`/delete`+window.location.search, {}).then(j => {
        if(j['posts._id'])
            commonNet.pushQuery('page', false, true)
        else
            commonNet.pushQuery('project', false, true)
    })
})

togglePreview.addEventListener('click', (e)=>{
    editor.classList.toggle('open')
})