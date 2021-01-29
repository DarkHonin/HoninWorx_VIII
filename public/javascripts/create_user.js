const uname = document.getElementById('username')
const password = document.getElementById('password')
const role = document.getElementById('role')

const save = document.getElementById('save')

save.addEventListener('click', () => {
    commonNet.fetch_middleware('', {
        uname : uname.value,
        pword : password.value,
        role : role.value
    })
})