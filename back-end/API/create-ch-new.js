require('dotenv').config()
const axios=require('axios')
const base64=require('base-64')

const GIT_TOKEN = process.env.GIT_TOKEN
const REPO = process.env.REPO
const MESSAGES = process.env.MESSAGES
const CHANNELS = process.env.CHANNELS
const { getMessages } = require("./getMessages");
const { writeMessage } = require("./writeMessage");
const { createChannel } = require("./createChannel");

async function newChannel2(firstId,secondId,req,res) {
    //if (!req.session.user) return res.status(401).send('cannot create if youre not logged in.')
    //const { firstId, secondId } = req.body;
    if (!firstId || !secondId) return res.status(400).send('missing fields');
    try {
        const { channels, sha } = await getChannels();
        const exists = channels.some(ch =>
            (ch.userId === firstId && ch.secUserId === secondId) ||
            (ch.userId === secondId && ch.secUserId === firstId)
        )
        
        if (exists) return res.status(409).send('channel already exists')

        const channel = {
            id: channels.length > 0 ? channels[channels.length - 1].id + 1 : 1,
            userId:req.session.user.userId,
            secUserId:secondId,
            creationDate: new Date().toISOString()
        };

        channels.push(channel);
        await createChannel(channels, sha);
       // res.status(201).send('account created');
    } catch (err) {
        console.error(err);
        //res.status(500).send(`500 internal server error`);
    }
}

module.exports = { newChannel2 };