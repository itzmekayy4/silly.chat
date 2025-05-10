require('dotenv').config()
const axios=require('axios')
const base64=require('base-64')
const { getMessages }=require('./getMessages')

const GIT_TOKEN = process.env.GIT_TOKEN
const REPO = process.env.REPO
const MESSAGES = process.env.MESSAGES
const CHANNELS = process.env.CHANNELS
const url=`https://api.github.com/repos/${REPO}/contents/${MESSAGES}`
async function writeMessage(messages,sha) {
  try{
    const headers = { Authorization: `token ${GIT_TOKEN}` }
    const body={
      message:'update messages',
      content: Buffer.from(JSON.stringify(messages, null, 2), 'utf8').toString('base64'),
      sha
    }
    await axios.put(url,body,{ headers })
  }catch(err){
    if (err.response && err.response.status===409){
      console.warn('sha out of date. retrying.')
      const { messages:freshMessages,sha:freshSha }=await getMessages();
      freshMessages.push(messages[messages.length-1])
      const retryContent = Buffer.from(JSON.stringify(freshMessages, null, 2), 'utf8').toString('base64')
      const retryData={
          message:'retry update',
          content:retryContent,
          sha:freshSha,
      }
      return await axios.put(url,retryData, { headers })
    }else{
      throw err
    }
  }

}

module.exports={ writeMessage }