if (window.electron){
    document.querySelector('.windowOptions').style.display='flex'
    console.log('%c🧩 [electron app]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', 'electron app detected');
}else{
    document.querySelector('.windowOptions').style.display='none'
    console.log('%c🧩 [electron app]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', 'browser detected');
}
let cmistatus=true
const max=document.getElementById('max')
function changeMaxIco(){
    if (cmistatus===false){
        max.innerHTML='&#xE922;'
        cmistatus=true
    }else{
        max.innerHTML='&#xE923;'
        cmistatus=false
    }
}