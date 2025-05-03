const axios=require('axios')
const base64=require('base-64')

const GIT_TOKEN='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'
const REPO='itzmekayy4/storage'
const ACCOUNTS='accounts.json'
const MESSAGES='messages.json'
const CHANNELS='channels.json'

async function getAccounts() {
    const url=`https://api.github.com/repos/${REPO}/contents/${ACCOUNTS}`
    const headers = { Authorization: `token ${GIT_TOKEN}` }
    const res = await axios.get(url, { headers })
    const content = base64.decode(res.data.content)
    return { accounts: JSON.parse(content), sha: res.data.sha }
}

async function saveAccounts(newAccounts,sha) {
  const url=`https://api.github.com/repos/${REPO}/contents/${ACCOUNTS}`
  const headers = { Authorization: `token ${GIT_TOKEN}` }
  const body={
    message:'update accounts',
    content: base64.encode(JSON.stringify(newAccounts,null,2)),
    sha
  }
  await axios.put(url,body,{ headers })
}



module.exports={ getAccounts,saveAccounts }