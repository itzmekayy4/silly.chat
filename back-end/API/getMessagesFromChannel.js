require('dotenv').config()
const axios=require('axios')
const base64=require('base-64')
const { createChannel } = require('./createChannel')

const GIT_TOKEN = process.env.GIT_TOKEN
const REPO = process.env.REPO
const MESSAGES = process.env.MESSAGES
const CHANNELS = process.env.CHANNELS
async function getMessagesFromChannel(channelId,userId) {
  const headers={Authorization:`token ${GIT_TOKEN}`}

  const channelUrl=`https://api.github.com/repos/${REPO}/contents/${CHANNELS}`
  const channelRes=await axios.get(channelUrl,{headers})
  const channels=JSON.parse(base64.decode(channelRes.data.content))
  
  const channel=channels.find(c => c.id.toString() === channelId.toString())
  if (!channel) throw new Error('404_not_found')
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
    .filter(msg => msg.channelId.toString()===channelId.toString())
    .sort((a,b)=> a.msgId-b.msgId)
}



















async function getMessagesFromChannel1(target, req,res) {
  if (!req.session.user) return res.status(401).send('cannot GET messages from any channel if you’re not logged in')

  const url = `https://api.github.com/repos/${REPO}/contents/${MESSAGES}`
  const headers = { Authorization: `token ${GIT_TOKEN}` }

  try {
    const userId = req.session.user.userId
    if (channel.userId !== userId && channel.secUserId !== userId)
      return res.status(403).send('unauthorized')
    
    const response = await axios.get(url, { headers })
    const content = base64.decode(response.data.content)
    const messages = JSON.parse(content)
    const targetMessages = messages
      .filter(msg => msg.channelId.toString() === target.toString())
      .sort((a, b) => a.msgId - b.msgId)    
    
    return targetMessages
  } catch (err) {
    console.log(`could not fetch channel id ${target}: ${err}`)
    //return []
    throw err
  }
}

module.exports={ getMessagesFromChannel }