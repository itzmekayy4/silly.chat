require('dotenv').config()
const axios=require('axios')
const base64=require('base-64')

const GIT_TOKEN = process.env.GIT_TOKEN
const REPO = process.env.REPO
const MESSAGES = process.env.MESSAGES
const CHANNELS = process.env.CHANNELS

async function createChannel(newChannel,sha) {
  const url=`https://api.github.com/repos/${REPO}/contents/${CHANNELS}`
  const headers = { Authorization: `token ${GIT_TOKEN}` }
  const body={
    message:'update channels',
    content: base64.encode(JSON.stringify(newChannel,null,2)),
    sha
  }
  await axios.put(url,body,{ headers })
}
module.exports={ createChannel }