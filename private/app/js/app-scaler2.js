const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const hideButton=document.getElementById('chat-back')
const innerchatbar=document.getElementById('inner-chat-top-bar')
if (!isMobile) { //-!
    hideButton.style.display="none"
    innerchatbar.classList.remove('onpc')
    console.log('%c🧩 [app]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', 'pc device detected');
} else {
    hideButton.style.display="flex"
    innerchatbar.classList.add('onpc')
}

const content=document.getElementById('app-main-content')
const dms=document.getElementById('app-aside-bar')
function show(){
    content.classList.add('active')
    content.classList.remove('notactive')
    dms.classList.add('notactive')
    dms.classList.remove('active')
    //content0.style.display="flex"
}
function hide(){
    content.classList.remove('active')
    content.classList.add('notactive')
    dms.classList.remove('notactive')
    dms.classList.add('active')
    //content0.style.display="none"
}
function normal(){
    content.classList.add('active')
    dms.classList.add('active')
    dms.classList.remove('notactive')
    content.classList.remove('notactive')
    innerchatbar.classList.add('onpc')
}