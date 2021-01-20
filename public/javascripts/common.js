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
    alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
}