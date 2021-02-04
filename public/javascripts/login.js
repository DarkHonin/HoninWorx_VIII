const uname = document.querySelector('#username')
const pword = document.querySelector('#password')
const captcha = document.querySelector('#captcha')
const captchaImg = document.querySelector('.captcha img')
const csrf = document.querySelector('#csrf')

const submit = document.querySelector('#submit')

submit.addEventListener('click', () => {
    commonNet.fetch_middleware('', {
        username : uname.value,
        password : pword.value,
        captcha : captcha.value,
        "csrf_token" : csrf.value
    }).then(j => {
        if(j.error){
            captchaImg.src = captchaRefreshUrl + '?'+ new Date().getTime()
            switch(j.error){
                case "INVALID_CAPTCHA":
                    return alert("Captcha invalid, please try again")
                case "INVALID_CRED":
                default:
                    return alert(j.message)
            }
        }
        else return window.location = '/'
    })

})
