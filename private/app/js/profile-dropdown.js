const dropprofilebutt=document.querySelector('#drop-profile-button')
const dropdown1=document.querySelector('#drop-profilee')
let activedropdownstate=false
dropprofilebutt.addEventListener('click',()=>{
    if (activedropdownstate===true){
        dropdown1.classList.toggle('visible')
        activedropdownstate=false
    }else{
        activedropdownstate=true
        dropdown1.classList.toggle('visible')
    }
})