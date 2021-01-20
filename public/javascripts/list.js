
const fnList = {
    select: (e)=>{
        const that = e.target
        if(that.tagName != "LI")
            return

        var varList = {
            selected_id : that.getAttribute('data-id'),
            clear : that.parentNode.getAttribute('data-clear'),
            type : that.parentNode.getAttribute('data-type')
        }

        that.parentNode.querySelectorAll('li.active').forEach(e=> e.classList.remove('active'))
        that.classList.add('active')
        commonNet.pushQuery(varList.clear, false)
        commonNet.pushQuery(varList.type, varList.selected_id, true)
        console.log(varList)
        /** To-do : Present requested cover */
    }
}

const lists = document.querySelectorAll(".list")
if(lists){
    lists.forEach((l,k)=>{
        l.childNodes.forEach(i=>{
            i.addEventListener('click', fnList.select);
        })
    })
}