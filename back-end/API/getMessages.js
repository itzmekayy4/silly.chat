require('dotenv').config()
const axios=require('axios')
const base64=require('base-64')

const GIT_TOKEN = process.env.GIT_TOKEN
const REPO = process.env.REPO
const MESSAGES = process.env.MESSAGES
const CHANNELS = process.env.CHANNELS

async function getMessages() {
  const url=`https://api.github.com/repos/${REPO}/contents/${MESSAGES}`
  const headers = { Authorization: `token ${GIT_TOKEN}` }
  const res = await axios.get(url, { headers })
  const content = Buffer.from(res.data.content, 'base64').toString('utf8')
  return { messages: JSON.parse(content), sha: res.data.sha }
}

module.exports={ getMessages }