function clearMessages() {
    maincontainer.innerHTML = '';
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
        clone.onclick = () => {}
        container.appendChild(clone)
        clone.onclick = async() => {
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
                const data=await res.json()
                const innertopbar=document.getElementById('inner-chat-top-bar')
                currentChannelId=data.channelId
                socket.emit('leaveChannel', currentChannelId)
                socket.emit('joinChannel',currentChannelId)
                innertopbar.querySelector('.current-chat-user').textContent = user.username
                innertopbar.querySelector('.current-chat-pfp').src = user.pfp
                clearMessages()
                fetchMessages(currentChannelId)
            } catch (error) {
                console.log(error);
                //alert('Error fetching messages');
            }
        }
    })
}

loadUsers()

async function fetchMessages(targetId) {
    try {
        const res = await fetch(`/channels/${targetId}`);

        if (!res.ok) {
            throw new Error('Failed to fetch messages11');
        }
        clearMessages()
        const messages = await res.json();
        messages.forEach(msg => {
            displayMessage2(msg);
        });
    } catch (error) {
        console.log(error);
        //alert('Error fetching messages'); 
    }
}


let currentChannelId = 1
const socket = io('http://localhost:3000/', {
    withCredentials: true
});
socket.on('connect', (data) => {
    console.log('websocket connected');
    fetchMessages(currentChannelId)
});
const txtbox = document.getElementById('user-input')
const maincontainer = document.getElementById('msgs')
txtbox.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        if (txtbox.value==='') return
        e.preventDefault()
        console.log('msg')
        let lastText
        lastText=txtbox.value
        const text = txtbox.value
        const temp= localmsg(localuser,txtbox.value)
        //postMsg(text)
        txtbox.value = ''
        try{
            const res= await postMsg(lastText)
            temp.remove()
        }catch{

        }
    }
})

async function postMsg(msg) {
    try {
        const res = await fetch('/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: msg,
                localId: 666,
                channelId: currentChannelId
            })
        })
        const text = await res.text()
    } catch (err) {
        console.log(err)
        alert('could not connect to server')
    }
}
const template = document.getElementById('msg')
function formatTimestamp(isoString) {
    const msgDate = new Date(isoString)
    const now = new Date()

    const isToday = msgDate.toDateString() === now.toDateString()

    const yesterday = new Date()
    yesterday.setDate(now.getDate() - 1)
    const isYesterday = msgDate.toDateString() === yesterday.toDateString()

    const options = { hour: 'numeric', minute: '2-digit', hour12: true }
    const timeStr = msgDate.toLocaleTimeString(undefined, options)

    if (isToday) return timeStr
    if (isYesterday) return `yesterday, ${timeStr}`
    return msgDate.toLocaleDateString() + ', ' + timeStr
}

async function displayMessage2(data) {
    const clone = template.cloneNode(true)
    console.log(data)
    try {
        const res = await fetch(`/users/${data.ownerid}`)
        if (res.ok) {
            const userData = await res.json()
            console.log('user data',userData)
            clone.querySelector('.msg-user').innerText = userData.username
            clone.querySelector('.current-msg-pfp').src = userData.pfp
            clone.style="display: flex;"
            console.log(data.username)
            console.log(data.message)
            clone.querySelector('.msg-txt-content').innerText = data.message
            clone.querySelector('.msg-times').innerText = formatTimestamp(data.timestamp)
            maincontainer.appendChild(clone)
        }
    } catch (err) {
        console.log(err)
    }
}

async function localmsg(userData,textmsg) {
    const clone = template.cloneNode(true)
    try {
        const res = await fetch(`/users/${data.ownerid}`)
        if (res.ok) {
            const userData = await res.json()
            console.log('user data',userData)
            clone.querySelector('.msg-user').innerText = userData.username
            clone.querySelector('.current-msg-pfp').src = userData.pfp
            clone.style="display: flex;"
            console.log(data.username)
            console.log(data.message)
            clone.querySelector('.msg-txt-content').innerText = textmsg
            clone.querySelector('.msg-times').innerText = formatTimestamp(new Date().toISOString())
            maincontainer.appendChild(clone)
            return clone
        }
    } catch (err) {
        console.log(err)
    }
}

socket.on('NewMessage', (msg) => {
    if (!msg) return
    if (msg.channelId.toString() === currentChannelId.toString()) {
        displayMessage2(msg)
    }
})



let localuser
async function getLocalUser(){
    const res = await fetch(`/users/0`)
    if (res.ok) {
        const userData = await res.json()
        console.log('user data',userData)
        //clone.querySelector('.msg-user').innerText = userData.username
        //clone.querySelector('.current-msg-pfp').src = userData.pfp
        localuser=userData
    }
}
getLocalUser()
