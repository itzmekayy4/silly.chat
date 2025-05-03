require('dotenv').config()
const axios=require('axios')
const base64=require('base-64')

const GIT_TOKEN = process.env.GIT_TOKEN
const REPO = process.env.REPO
const MESSAGES = process.env.MESSAGES
const CHANNELS = process.env.CHANNELS
async function getMessagesFromTargetId(target) {
  const url=`https://api.github.com/repos/${REPO}/contents/${MESSAGES}`
  const headers = { Authorization: `token ${GIT_TOKEN}` }

  try{
    const res = await axios.get(url, { headers })
    const content = Buffer.from(res.data.content, 'base64').toString('utf8')
    const messages= JSON.parse(content)
    console.log(messages)
    const targetMessages=messages.filter(msg=>
      msg.receiverId.toString()===target.toString()
    )
    targetMessages.sort((a,b)=> a.msgId-b.msgId)
    return targetMessages
  }catch(err){
    console.log(`could not fetch id ${target}: ${err}`)
    return []
  }
}

module.exports={ getMessagesFromTargetId }