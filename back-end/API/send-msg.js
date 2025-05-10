const { getMessages } = require("./getMessages");
const { writeMessage } = require("./writeMessage");
const {}=require('../ramService/buffer-msg')
const axios=require('axios')
const base64=require('base-64')

async function sendMsg(req, res) {
    if (!req.session.user) return res.status(401).send('cannot send a message if youre not logged in.')
    const { message ,channelId } = req.body;
    const ownerid = req.session.user.userId;
    const username = req.session.user.username;
    if (!message || !channelId) return res.status(400).send('missing fields');
    try {
        const { messages, sha } = await getMessages();
        const newMsg = {
            msgId: messages.length > 0 ? messages[messages.length - 1].msgId + 1 : 1,
            message,
            timestamp: new Date().toISOString(),
            ownerid,
            channelId,
        };
        messages.push(newMsg);
        await writeMessage(messages, sha);
        console.log(newMsg)
        console.log(`${req.session.user.userId} sent a message`)
        console.log(`${newMsg}`)
        return newMsg
    } catch (err) {
        console.error(err);
        res.status(500).send(`your message could not be delivered`);
    }
}

module.exports={ sendMsg }