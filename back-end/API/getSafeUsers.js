require('dotenv').config()
const axios=require('axios')
const base64=require('base-64')

const GIT_TOKEN = process.env.GIT_TOKEN
const REPO = process.env.REPO
const MESSAGES = process.env.MESSAGES
const CHANNELS = process.env.CHANNELS
const ACCOUNTS = process.env.ACCOUNTS
async function getSafeUsers() {
  const url = `https://api.github.com/repos/${REPO}/contents/${ACCOUNTS}`
  const headers = { Authorization: `token ${GIT_TOKEN}` }
  const res = await axios.get(url, { headers })
  const content = base64.decode(res.data.content)
  const allAccounts = JSON.parse(content)
  const safeAccounts = allAccounts.map(({ password, ...rest }) => rest)
  return {
    accounts: safeAccounts,
    sha: res.data.sha
  }
}


module.exports={ getSafeUsers }