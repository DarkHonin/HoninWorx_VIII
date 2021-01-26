const passwordInput = document.querySelector('#password')
const submitButton = document.querySelector('#submit')


submitButton.addEventListener('click', ()=>{
    commonNet.fetch_middleware(window.location, {'password' : passwordInput.value}).then(e => {
        window.location.href = '/'
    })
})