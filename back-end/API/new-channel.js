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
const { getChannels } = require("./getChannels");

async function newChannel(req, res) {
    if (!req.session.user) return res.status(401).send('cannot create if youre not logged in.')
    const { secondId } = req.body;
    const firstId = req.session.user.userId;
    if (!firstId || !secondId) return res.status(400).send('missing fields');
    try {
        const { channels, sha } = await getChannels();
        const ch = channels.find(ch =>
            (ch.userId.toString() === firstId.toString() && ch.secUserId.toString() === secondId.toString()) ||
            (ch.userId.toString() === secondId.toString() && ch.secUserId.toString() === firstId.toString())
          )
        if (ch) return res.status(201).json({channelId:ch.id});

        const channel = {
            id: channels.length > 0 ? channels[channels.length - 1].id + 1 : 1,
            userId:req.session.user.userId,
            secUserId:secondId,
            creationDate: new Date().toISOString()
        };

        channels.push(channel);
        await createChannel(channels, sha);
        res.status(201).json({channelId:channel.id})
    } catch (err) {
        console.error(err);
        res.status(500).send(`500 internal server error`);
    }
}

module.exports = { newChannel };