function clearMessages() {
    maincontainer.innerHTML = '';
    console.log('%c🧩 [app]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', 'removed messages from the current channel');
}
const noteCon = document.querySelector('.user-notes')
const templateNoteProf = document.getElementById('u-note')
function addProfileAtTheDirectsTopBar(user){
    const clone=templateNoteProf.cloneNode(true)
    clone.style = 'display:flex;'
    clone.querySelector('.username').textContent = user.username
    clone.querySelector('.user-pfp').src = user.pfp
    console.log('%c🧩 [app]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', `added profile for${user.username}`);
    noteCon.appendChild(clone)
}
async function loadUsers() {
    const res = await fetch('/getAllUsers')
    const users = await res.json()
    const container = document.querySelector('.profiles')
    const template = document.getElementById('defprof')

    users.accounts.forEach(user => {
        const clone = template.cloneNode(true)
        clone.style = 'display:flex;'
        clone.querySelector('.username').textContent = user.username
        clone.querySelector('.pfp').src = user.pfp
        console.log('%c🧩 [app]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', `added dm button for${user.username}`);
        //clone.onclick = () => {}
        addProfileAtTheDirectsTopBar(user)
        container.appendChild(clone)
        clone.onclick = async() => {
            //await LoadDirect(user)
            //window.location=`#directs/#${user.id}`
            console.log('%c🧩 [event]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', `user clicked on direct for ${user.username}`);
            if (currentChannelId === user.id){
                if (!isDesktop()){
                    show()
                }
                return
            } 
            history.pushState({},'',`/@me/${user.id}`)
            console.log('%c🧩 [app]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', `channel was changed for ${user.id}`);
            route()
            if (!isDesktop()){
                show()
            }
        }
    })
}

loadUsers()

async function LoadDirect(user) {
    console.log('%c🧩 [app]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', `load direct request`);
    document.querySelector('.not-useful--chats').style.display='none'
    if (currentChannelId === user.id) return
    document.getElementById('app-current-channel').style = "display: flex;"
    clearMessages()
    try {
        const res = await fetch('/create-ch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstId: 122,
                secondId: user.id,
            })
        })
        console.log('%c🧩 [app]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', `created/got channel :430`);
        const data = await res.json()
        const innertopbar = document.getElementById('inner-chat-top-bar')
        currentChannelId = data.channelId
        socket.emit('leaveChannel', currentChannelId)
        socket.emit('joinChannel', currentChannelId)
        innertopbar.querySelector('.current-chat-user').textContent = user.username
        txtbox.placeholder = `Message ${user.username}`
        document.querySelector('.sc').textContent=`${user.username} | silly.chat`
        document.title=`${user.username} | silly.chat`
        innertopbar.querySelector('.current-chat-pfp').src = user.pfp
        fetchMessages(currentChannelId)
    } catch (err) {
        console.log(err)
    }   
}