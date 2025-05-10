// main modules
//const session = require('express-session');
const session = require('cookie-session'); //old: express-session
const http = require('http');
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon');
const { Server } = require('socket.io');

const isProd = process.env.NODE_ENV === 'production'
const domain = isProd
  ? 'https://sillychat.up.railway.app'
  : 'http://localhost:3000'
//app
const app = express()
const port = process.env.PORT || 3000
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:domain,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const routes=require('./back-end/routes/routes')
const {sendMsg}=require('./back-end/API/functions')
const mw=require('./back-end/services/services-middleware');
const serveFavicon = require('serve-favicon');

app.use(session({
  secret: 'abc for a custom website design 😅',
  resave: false,            
  saveUninitialized: false,
  cookie: { secure: true }
}));

io.on('connection', (socket) => {
  //console.log('websocket connected');
  socket.emit('NewMessage');
  socket.on('joinChannel', (channelId) => {
      socket.join(`channel-${channelId}`)
  })
  socket.on('leaveChannel', (channelId) => {
    socket.leave(`channel-${channelId}`)
  })
  socket.on('disconnect', () => {
    //console.log('websocket disconnected');
  });
});

app.use(require('body-parser').json())
app.post('/validate',routes)
app.post('/register',routes)
app.post('/create-ch',routes)
app.post('/updatePfp',routes)
app.get('/logout',routes)
app.get('/api/getgroups',routes)
app.post('/sendMessage', async function (req, res) {
  try {
      const newMsg = await sendMsg(req,res);
      res.status(201).send(newMsg);
      console.log(newMsg.channelId)
      io.to(`channel-${newMsg.channelId}`).emit('NewMessage',newMsg)
  } catch (err) {
      console.error(err);
      res.status(400).send(err.message);
  }
});

app.get('/getAllUsers',routes)

app.get('/users/:targetId',routes)
app.get('/messages/:targetId',routes)
app.get('/channels/:targetId',routes)
app.use('/private', mw.authMiddleware, express.static(path.join(__dirname, 'private')));
app.get(/^\/private\/.*/, mw.authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'private', 'app', 'index.html'))
})
app.get(/^\/(private|@me)(\/.*)?$/, mw.authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'private', 'app', 'index.html'))
})

//express.static(path.join(__dirname, 'private'));
app.use(express.static(path.join(__dirname, 'front')));
app.use(express.static(path.join(__dirname, 'public')));
serveFavicon(path.join(__dirname, 'public', 'favi', 'favicon.ico'))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'index.html'));
});

server.listen(port, () => {
  console.log(`started on ${port}`);
  setTimeout(()=>{
    io.emit('reload')
  },10000)
});