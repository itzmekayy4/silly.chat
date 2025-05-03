const express = require('express');
const path=require('path')
const { register, validate } = require('../controllers/auth');
//const { getMessagesFromTargetId, getSafeUsers,getMessagesFromChannel } = require('../services/services-acc');
const { newChannel, sendMsg,getMessagesFromTargetId,getSafeUsers,getMessagesFromChannel, getUser, newChannel2 }=require('../API/functions')

const router = express.Router();

router.post('/register', register);
router.post('/validate', validate);
router.post('/create-ch', newChannel);
router.post('/sendMessage', sendMsg);
router.get('/messages/:targetId',async(req,res)=>{
    const targetid1=parseInt(req.params.targetId);
    try{
        const msgs=await getMessagesFromTargetId(targetid1)
        res.json(msgs)
    } catch(err){
        res.status(500).send('Internal server error: Failed at fetching messages: ',err)
    }
});

router.get('/channels/:targetId', async (req, res) => {
  const targetId = parseInt(req.params.targetId)
  try {
    if (!req.session.user) return res.status(401).send('not logged in')

    const msgs = await getMessagesFromChannel(targetId, req.session.user.userId)
    res.json(msgs)
  } catch (err) {
    if (err.message === 'unauth') //newChannel2(req,res) //return res.status(403).send('unauthorized')
    if (err.message === 'not_found') return
    console.error(err)
    res.status(500).send('internal server error while fetching messages')
  }
})


router.get('usermessages/:targetId',async(req,res)=>{
    const targetid1=parseInt(req.params.targetId);
    try{
        const msgs=await getMessagesFromTargetId(targetid1,req,res)
        res.json(msgs)
    } catch(err){
        res.status(500).send('Internal server error: Failed at fetching messages')
    }
});

router.get('/users/:targetId',async(req,res)=>{
    const targetid1=parseInt(req.params.targetId);
    try{
        //const data=await getUser(targetid1)
        let data
        if (targetid1===0){
            data=await getUser(req.session.user.userId)
        }else{
            data=await getUser(targetid1)
        }
        res.json(data)
    } catch(err){
        console.log(err);
        res.status(500).send('Internal server error: Failed at fetching user ' +targetid1)
    }
});


router.get('/getAllUsers',async(req,res)=>{
    try{
        const users=await getSafeUsers()
        res.json(users)
    } catch(err){
        console.log(err)
        res.status(500).send('Internal server error: Failed at fetching users')
    }
});

module.exports = router;
