
require('dotenv').config()
const axios=require('axios')
const base64=require('base-64')


const GIT_TOKEN = process.env.GIT_TOKEN
const REPO = process.env.REPO
const MESSAGES = process.env.MESSAGES
const ACCOUNTS = process.env.ACCOUNTS
const CHANNELS = process.env.CHANNELS


const { getAccounts, saveAccounts } = require('../services/services-acc')

async function updateUserPfp(req,res) {
    const npfp = req.body.pfp
    if (!npfp) return res.status(400).json({ error: 'missing new pfp url' })
        try {
            const { accounts, sha } = await getAccounts()
            console.log(accounts            )
            console.log(req.session.user.userId)
            const index = accounts.findIndex(u => u.id === req.session.user.userId)
    
            if (index === -1) return res.status(404).json({ error: 'user not found' })
    
            accounts[index].pfp = npfp
            await saveAccounts(accounts, sha)
    
            res.status(200).json({ success: true })
        } catch (err) {
            console.error('failed to update pfp:', err)
            res.status(500).json({ error: 'server error' })
        }
}
module.exports={ updateUserPfp }