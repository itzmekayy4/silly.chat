const maincontainer = document.getElementById('msgs')
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
    if (isYesterday) return `Yesterday at ${timeStr}`
    return msgDate.toLocaleDateString() + ', ' + timeStr
}

async function displayMessageOld(data) {
    const clone = template.cloneNode(true)
    try {
        const res = await fetch(`/users/${data.ownerid}`)
        if (res.ok) {
            const userData = await res.json()
            clone.querySelector('.msg-user').innerText = userData.username
            clone.querySelector('.current-msg-pfp').src = userData.pfp
            clone.style="display: flex;"
            clone.querySelector('.msg-txt-content').innerText = data.message
            clone.querySelector('.msg-times').innerText = formatTimestamp(data.timestamp)
            maincontainer.appendChild(clone)
            maincontainer.scrollTop = maincontainer.scrollHeight
        }
    } catch (err) {

    }
}

async function displayMessage2(data) {
    const clone = template.cloneNode(true)
    const userData = data.user
    console.log('%c🧩 [displayMessage2]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', `received user data: ${userData}`);
    clone.querySelector('.msg-user').innerText = userData.username
    clone.querySelector('.current-msg-pfp').src = userData.pfp
    //clone.querySelector('.msg-txt-content').innerText = data.message do not delete
    clone.querySelector('.msg-txt-content').innerHTML = await format(data.message)
    clone.querySelector('.msg-times').innerText = formatTimestamp(data.timestamp)
    
    clone.style.display = 'flex'
    maincontainer.appendChild(clone)
    maincontainer.scrollTop = maincontainer.scrollHeight
    clone.classList.toggle('show')
}


function localmsg(userData, textmsg) {
    const clone = template.cloneNode(true)
    
    clone.querySelector('.msg-user').innerText = userData.username
    clone.querySelector('.current-msg-pfp').src = userData.pfp
    clone.querySelector('.msg-txt-content').textContent = textmsg
    clone.querySelector('.msg-times').innerText = formatTimestamp(new Date().toISOString())
    
    clone.style.display = 'flex'
    clone.style.opacity = 0.5
    clone.classList.toggle('show')

    maincontainer.appendChild(clone)
    maincontainer.scrollTop = maincontainer.scrollHeight
    return clone
}

function notsendmessage(userData, textmsg) {
    const clone = template.cloneNode(true)
    
    clone.querySelector('.msg-user').innerText = userData.username
    clone.querySelector('.current-msg-pfp').src = userData.pfp
    clone.querySelector('.msg-txt-content').textContent = textmsg
    clone.querySelector('.msg-times').innerText = formatTimestamp(new Date().toISOString())+ 'message was not sent.'
    
    clone.style.display = 'flex'
    clone.style.color='red'

    maincontainer.appendChild(clone)
    maincontainer.scrollTop = maincontainer.scrollHeight
    return clone
}
