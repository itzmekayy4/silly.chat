console.log('%c🧩 [render]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', 'started listening for dcl');
if (!dev) {
    document.querySelector('.app-loader-mount').style='display:none;'
}
window.addEventListener('DOMContentLoaded',()=>{
    console.log('%c🧩 [render]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', 'dom content loaded');

        setTimeout(()=>{
        if (!dev) return
        document.querySelector('.spinner-wrapper').classList.add('hide')
        document.querySelector('.app-loader-mount').classList.add('hide')
        console.log('%c🧩 [render]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', 'removed loader');
    },1500)
    setTimeout(()=>{
        if (!dev) return
        document.querySelector('.app-loader-mount').style='display:none;'
    },2000)
})