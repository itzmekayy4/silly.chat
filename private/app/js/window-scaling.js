const content0 = document.getElementById('app-main-content');
const content1 = document.getElementById('app-aside-bar');
function isDesktop(){
    return !/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function u0(){
    if (window.innerWidth<=748){
        const content = document.getElementById('app-main-content');
        const content1 = document.getElementById('app-aside-bar');
        content.style.display="flex"
        //content1.style='width: 22rem; margin-left:1rem;'
        innerchatbar.classList.add('onpc')
        if (!isDesktop()){
            //content1.classList.add('mob')
            content1.style.width='100%'
            hideButton.style.display="flex"
            innerchatbar.classList.remove('onpc')
            hide()
        }
    }else{
        hideButton.style.display="none"
        content.style.display="flex"
        innerchatbar.classList.add('onpc')
        content1.style.width='22rem'
        if (isDesktop()){
            content1.classList.remove('mob')
            content.style.display="flex"
            document.querySelector('.mobileSendButton').style.display='none'
            normal()
        }            }
    if (!isDesktop()){ //!
        content.style.display="none"
        document.querySelector('.mobileSendButton').style.display='flex'
        content0.style="display:flex;"
        //content1.style='width: 22rem; margin-left:1rem;'
        hideButton.style="display:flex;"
    }
}
window.addEventListener('load', u0);
window.addEventListener('resize', u0);