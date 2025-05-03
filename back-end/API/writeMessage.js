require('dotenv').config()
const axios=require('axios')
const base64=require('base-64')

const GIT_TOKEN = process.env.GIT_TOKEN
const REPO = process.env.REPO
const MESSAGES = process.env.MESSAGES
const CHANNELS = process.env.CHANNELS
async function writeMessage(messages,sha) {
  const url=`https://api.github.com/repos/${REPO}/contents/${MESSAGES}`
  const headers = { Authorization: `token ${GIT_TOKEN}` }
  const body={
    message:'update messages',
    content: Buffer.from(JSON.stringify(messages, null, 2), 'utf8').toString('base64'),
    sha
  }
  await axios.put(url,body,{ headers })
}

module.exports={ writeMessage }