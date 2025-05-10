const txtbox = document.getElementById('user-input')
txtbox.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        if (e.shiftKey) {
            // insert newline (invisible <br> style)
            e.preventDefault()
            const start = txtbox.selectionStart
            const end = txtbox.selectionEnd
            txtbox.value = txtbox.value.slice(0, start) + '<br>' + txtbox.value.slice(end)
            txtbox.selectionStart = txtbox.selectionEnd = start + 4
            return
        }
        if (txtbox.value==='') return
        e.preventDefault()
        let lastText
        lastText=txtbox.value
        const text = txtbox.value
        //console.log('localuser: ',localuser)
        try{
            const temp= localmsg(localuser,txtbox.value)
            const res= await postMsg(lastText)
            temp.remove()
        }catch{
            notsendmessage(localuser,text)
        }
        txtbox.value = ''
    }
})