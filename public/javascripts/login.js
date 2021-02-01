const uname = document.querySelector('#username')
const pword = document.querySelector('#password')
const captcha = document.querySelector('#captcha')
const csrf = document.querySelector('#csrf')

const submit = document.querySelector('#submit')

submit.addEventListener('click', () => {
    commonNet.fetch_middleware('', {
        username : uname.value,
        password : pword.value,
        captcha : captcha.value,
        "csrf_token" : csrf.value
    }).then(j => {
        if(!j.status) return alert(j.message)
        else return window.location = '/'
    })

})