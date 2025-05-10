function formatUrl(message){
    const regex= /(https?:\/\/[^\s]+)/g
    return message.replace(regex,(url)=>{
        return `<a href="${url}" target="_blank">${url}</a>`
    })
}
function formatMarkdown(message){
    message = message.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    message = message.replace(/\*(.*?)\*/g, '<i>$1</i>');
    message = message.replace(/__(.*?)__/g, '<u>$1</u>');
    return message;
}

function format(message){
    message=formatUrl(message)
    message=formatMarkdown(message)
    return message
}