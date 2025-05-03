let currentChannelId = 1
const socket = io('http://localhost:3000/', {
    withCredentials: true
});
socket.on('connect', (data) => {
    console.log('websocket connected');
});
const txtbox = document.getElementById('user-input')
const maincontainer = document.getElementById('msgs')
txtbox.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        console.log('msg')
        const text = txtbox.value
        postMsg(text)
        txtbox.value = ''
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
        console.error(err)
        alert('could not connect to server')
    }
}
const template = document.getElementById('msg')

function displayMessage2(data) {
    const clone = template.cloneNode(true)
    console.log(clone)
    clone.style = 'display:flex;'
    console.log(data.username)
    console.log(data.message)
    clone.querySelector('.msg-txt-content').innerText = data.message
    clone.querySelector('.msg-user').innerText = data.username
    clone.querySelector('.current-msg-pfp').scr = data.pfp
    maincontainer.appendChild(clone)
}

socket.on('NewMessage', (newMsg) => {
    console.log('received logs', newMsg);
    //fetchMessages(2)
    if (newMsg === undefined) return
    displayMessage2(newMsg)
});