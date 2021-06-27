
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000 ;

app.use(express.static(__dirname));

var users ={};
var rooms = {first: 5060};
io.on('connection' , socket=>{
socket.on('new-user-join' , (name ,  room) =>{
  let check = false;
  for (const key in rooms) {
    if (rooms[key] == room) {
     check = true;
     break;
    }
  }
  if (check) {
    
  users[socket.id] = name;
  socket.join(room);
  
  rooms[socket.id] = room;
  socket.emit('group-info' ,  );
  // console.log(users);
  // console.log();
  io.to(rooms[socket.id]).emit('new-user-join' , users[socket.id]);
  socket.emit('join-status' , true);
  console.log(name + room);
}
else{
  socket.emit('join-status' , false);
}
})

socket.on('send' , masseg =>{
  
io.to(rooms[socket.id]).emit('recive' , masseg ,users[socket.id]);
})

socket.on('disconnect' , ()=>{
 socket.emit('user-disconected' , users[socket.id]);
 delete users[socket.id];
 delete rooms[socket.id];
})
})
server.listen(port, () => {
  console.log(`Socket.IO server running at ${port}`);
});