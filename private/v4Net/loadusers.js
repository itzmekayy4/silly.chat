async function loadUsers() {
    const res = await fetch('/getAllUsers')
    const users = await res.json()
    const container = document.querySelector('.profiles')
    const template = document.getElementById('defprof')

    users.accounts.forEach(user => {
        const clone = template.cloneNode(true)
        clone.style='display:flex;'
        clone.querySelector('.username').textContent = user.username
        clone.querySelector('.pfp').src = user.pfp
        clone.onclick = () => {
        }
        container.appendChild(clone)
    })
}
loadUsers()