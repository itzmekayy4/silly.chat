require('dotenv').config()
const axios=require('axios')
const base64=require('base-64')

const GIT_TOKEN = process.env.GIT_TOKEN
const REPO = process.env.REPO
const MESSAGES = process.env.MESSAGES
const CHANNELS = process.env.CHANNELS
async function getChannels() {
  const url = `https://api.github.com/repos/${REPO}/contents/${CHANNELS}`
  const headers = { Authorization: `token ${GIT_TOKEN}` }
  const res = await axios.get(url, { headers })
  const content = base64.decode(res.data.content)
  const allChannels = JSON.parse(content)
  //const safeAccounts = allAccounts.map(({ password, ...rest }) => rest)
  return {
    channels: allChannels,
    sha: res.data.sha
  }
}

module.exports={ getChannels }