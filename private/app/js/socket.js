const isLocalhost = window.location.hostname === 'localhost'
const domain = isLocalhost
  ? 'http://localhost:3000'
  : 'https://sillychat.up.railway.app'

const domain1=domain
window.currentChannelId = 0 //await getLocalUser().id //0 g
const socket = io(domain1, {
    withCredentials: true
});
socket.on('connect', (data) => {
    console.log('%c🧩 [socket]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', `connection was established`);
});

socket.on('NewMessage', async(msg) => {
  console.log('%c🧩 [app-socket]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', `got a socket event`);
  if (!msg){
      console.log('%c🧩 [app-socket]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', `no message detected`);
      return
  }
  if (!msg.ownerid===localuser.id){
      if (noti) noti.play().catch(e => console.warn('could not play sound:', e))
      console.log('%c🧩 [app-socket]', 'background: #2c2f33; color: #00b0f4; padding: 2px 4px; border-radius: 4px;', `notification sound was played`);
  }
  if (msg.channelId.toString() === currentChannelId.toString()) {
      console.log('got a message for '+currentChannelId.toString())
      if (!msg.ownerid===localuser.id){
          if (noti) noti.play().catch(e => console.warn('could not play sound:', e))
      }
      try {
          const res = await fetch(`/users/${msg.ownerid}`);
          if (!res.ok) {
              console.log('res not okay');
              return;
          }
          const user = await res.json();
          msg.user = user;
          displayMessage2(msg);
      } catch (err) {
          console.error('failed to fetch user for socket msg:', err);
      }
  }
})

socket.on('reload', ()=>location.reload())