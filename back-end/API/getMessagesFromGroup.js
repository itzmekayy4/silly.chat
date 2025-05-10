require('dotenv').config()
const axios=require('axios')
const base64=require('base-64')
const { createChannel } = require('./createChannel')
const { createGroup } = require('./createGroup')

const GIT_TOKEN = process.env.GIT_TOKEN
const REPO = process.env.REPO
const MESSAGES = process.env.MESSAGES
const GROUPS = process.env.GROUPS
async function getMessagesFromGroup(groupId,userId) {
  const headers={Authorization:`token ${GIT_TOKEN}`}

  const channelUrl=`https://api.github.com/repos/${REPO}/contents/${GROUPS}`
  const channelRes=await axios.get(channelUrl,{headers})
  const channels=JSON.parse(base64.decode(channelRes.data.content))
  
  const channel=channels.find(c => c.id.toString() === groupId.toString())
  if (!channel)
    if (
      channel.userId.toString() !== userId.toString() &&
      channel.secUserId.toString() !== userId.toString()
    ) {
      throw new Error('unauth')
    }
      
  const msgUrl=`https://api.github.com/repos/${REPO}/contents/${MESSAGES}`
  const messageRes = await axios.get(msgUrl, { headers })
  const messages = JSON.parse(Buffer.from(messageRes.data.content, 'base64').toString('utf8'))
  return messages
    .filter(msg => msg.groupId.toString()===groupId.toString())
    .sort((a,b)=> a.msgId-b.msgId)
}


module.exports={ getMessagesFromGroup }