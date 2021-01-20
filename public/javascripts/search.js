/* use strict */

const fnSearch = {
    onChange: (e) => { 
        if(!e.key.match(/[a-zA-Z0-9]/i))
            return e.preventDefault()
        const varSearch = {
            searchString : "",
            
        }
        var that = e.target
        var text = that.outerText
        const isWaiting = false
        varSearch.searchString = text
        clearTimeout(isWaiting);
        isWaiting = setTimeout(() =>{
            /* To-do : Sync item list list */
            commonNet.pushQuery(that.getAttribute('data-target'), varSearch.searchString)
            isWaiting = false
        },500)
    },
}

const search = document.querySelectorAll(".searchblock")
if(search){
    search.forEach((v, k) => {
        v.addEventListener('keydown', fnSearch.onChange)
        v.addEventListener('input', fnSearch.onChange)
    })
}

