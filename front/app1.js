const DEFAULT_CHAT_PATH='/private/v4Net/index.html'
document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault()
    const username = document.getElementById('username').value.trim()
    const password = document.getElementById('password').value.trim()

    if (!username || !password) {
        alert('missing fields')
        return
    }

    try {
        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })

        const text = await res.text()

        if (res.ok) {
            alert('Your account has been created!')
            await validate()
            window.location=DEFAULT_CHAT_PATH
        } else {
            alert('error: ' + text)
        }
    } catch (err) {
        console.error(err)
        alert('could not connect to server')
    }
})

async function validate(){
    const username = document.getElementById('username').value.trim()
    const password = document.getElementById('password').value.trim()
    try {
        const res = await fetch('/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })

        const text = await res.text()

        if (res.ok) {
            //alert('success: ' + text)
            window.location=DEFAULT_CHAT_PATH
        } else {
            alert('error: ' + text)
        }
    } catch (err) {
        console.error(err)
        alert('could not connect to server')
    }
}