const { createChannel } =require('./createChannel')
const { getChannels } =require('./getChannels')
const { getMessages } =require('./getMessages')
const { getMessagesFromChannel } =require('./getMessagesFromChannel')
const { getMessagesFromTargetId } =require('./getMessagesFromId')
const { getSafeUsers } =require('./getSafeUsers')
const { getUser } = require('./getUser')
const { newChannel } =require('./new-channel')
const { sendMsg } =require('./send-msg')
const { writeMessage } =require('./writeMessage')
const { newChannel2 } =require('./create-ch-new')
const { logout } = require('./logout')

module.exports={
    newChannel,
    createChannel,
    getChannels,
    getMessages,
    getMessagesFromChannel,
    getMessagesFromTargetId,
    getSafeUsers,
    sendMsg,
    writeMessage,
    getUser,
    newChannel2,
    logout
}