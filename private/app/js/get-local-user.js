window.localuser
async function getLocalUser(){
    const res = await fetch('/users/0')
    if (res.ok) {
        localuser= await res.json()                
        document.querySelector('.localpfp').src=localuser.pfp
    }
}
async function abc() {
    await getLocalUser()
}
abc()

async function getUser(id){
    const res = await fetch(`/users/${id}`)
    if (res.ok) {
        return await res.json()                
    }
}