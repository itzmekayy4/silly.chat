let buffer=[]

function addContent(content){
    buffer.push(content)
}
function flushContent(content){
    const toflush=[...buffer]
    buffer=[]
    return toflush
}
function getBufferedMessages(content){
    return buffer
}

module.exports={ addContent,flushContent,getBufferedMessages }