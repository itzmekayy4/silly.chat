require('dotenv').config()
const axios=require('axios')
const base64=require('base-64')

const GIT_TOKEN = process.env.GIT_TOKEN
const REPO = process.env.REPO
const MESSAGES = process.env.MESSAGES
const GROUPS = process.env.GROUPS

async function getGroups() {
    const url = `https://api.github.com/repos/${REPO}/contents/${GROUPS}`
    const headers = { Authorization: `token ${GIT_TOKEN}` }
    const res = await axios.get(url, { headers })
    const content = base64.decode(res.data.content)
    const allGroups = JSON.parse(content)
    return {
        channels: allGroups,
        //sha: res.data.sha
    }
}

module.exports={ getGroups }