var fetch_url = (videoURL) => "http://www.youtube.com/oembed?url="+videoURL+"&format=json"

const clearMedia = document.querySelector('[data-clear-select]')
clearMedia.addEventListener('click', (click) => {
    var ele = document.getElementsByName("media");
    for(var i=0;i<ele.length;i++)
    ele[i].checked = false;
})