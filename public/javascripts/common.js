
const getQuery = new URLSearchParams(window.location.search)

const commonNet = {
    pushQuery: (queryit, value, force = false) => {
        console.log(queryit, value)
        if(!value)
            getQuery.delete(queryit)
        else{
            getQuery.set(queryit, value)
            var query = getQuery.toString()
            window.location.search = '?' + query
        }
        if(force){
            var query = getQuery.toString()
            window.location.search = '?' + query
        }
        
    },

    fetch_middleware: (url, data)=>{
        const sdata = JSON.stringify(data)
        console.log(url, sdata)

        return fetch(url, {
            method : data ? "post" : "get",
            headers : {
                "Content-Type" : "application/json"
            },
            body : sdata ? sdata : undefined
        }).then(r=> r.json())
    }
}


function onTelegramAuth(user) {
    commonNet.fetch_middleware('/tg_auth', { user }).then(j => {
        if(j.status)
            document.cookie = `tg_user=${JSON.stringify(user)}`
    });
}

const clearMedia = document.querySelector('[data-clear-select]')
clearMedia.addEventListener('click', (click) => {
    var ele = document.getElementsByName("media");
    for(var i=0;i<ele.length;i++)
    ele[i].checked = false;
})

document.querySelectorAll("[data-href]").forEach(e => {
    e.addEventListener('click', () => {
        window.location = e.getAttribute('data-href')
    })
})