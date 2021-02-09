const fields = ['username', 'password', 'is_admin', 'csrf_token', 'action', 'id']

const userForm = Spider('#userForm', {
    ...fields,
    buttons : ['submit', 'delete']
}).then(form => {
    form.buttons.submit.addEventListener('click', ()=>{
        var formData = {}
        fields.forEach(v => {
            Object.assign(formData, {[v] : (v=='is_admin' ? form[v].checked : form[v].value)})
        })

        commonNet.fetch_middleware('/u', formData).then(({status, u, message}) => {
            if(!status) return alert(message)
            if(formData.action == 'create') return window.location = `/u/${u._id}`
            if(formData.action == 'update') return window.location = window.location
        })
    })

    form.buttons.delete.addEventListener('click', () => {
        commonNet.fetch_middleware('/u', {id : form.id.value, csrf_token : form.csrf_token.value, action : 'delete'}).then(({status, u, message}) => {
            if(!status) return alert(message)
            window.location = '/u'
        })
    })
})
