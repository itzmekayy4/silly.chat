async function route(){
    const path=location.pathname.split('/')
    if (path[1]==='@me'&&path[2]){
        const uid=path[2]
        let user= await getUser(uid)
        console.log('%c🧩 [app]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', `direct loading for ${user.username}`);
        LoadDirect(user)
    }else{
        if (path[1]==='directs'&&path[2]==='home'){
            document.querySelector('.not-useful--chats').style.display='flex'
        }
        if (path[1]==='content'&&path[2]==='div'&&path[3]){
            const contentname=path[3]
            const div=document.querySelector(`.${contentname}`)
            if (div){
                //div.style.display='flex' ILL BE WORKING ON THIS LATER
            }
        }
    }
}
window.addEventListener('popstate',route)
window.addEventListener('DOMContentLoaded',route)