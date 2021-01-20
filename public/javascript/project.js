function create_note(e){
    e.preventDefault()
    var form = this
    var project_id = form.getAttribute('project')
    var formdata = new FormData(form)
    var ret = {
        action : 'create',
        project_id 
    }
    formdata.forEach((v, k)=>ret[k] = v)
    fetch('/create/note', {
        method : "post",
        headers : {
            'content-type' : 'application/json'
        },
        body : JSON.stringify(ret)
    }).then(() => window.location.reload())
    return false
}

function delete_note(note_id, project_id){
    var ret = {
        action : 'delete',
        project_id,
        note_id 
    }
    fetch('/create/note', {
        method : "post",
        headers : {
            'content-type' : 'application/json'
        },
        body : JSON.stringify(ret)
    }).then(() => document.getElementById(note_id).remove())
    return false
}



function create_media(){}


document.forms['new_note_form'].addEventListener('submit', create_note)