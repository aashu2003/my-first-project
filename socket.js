const { Socket } = require('dgram');
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);

const {Server} = require('socket.io');

const io =new Server(server);
app.use(express.static(path.join(__dirname , '../public_html')));
var user = {};
var names = {};
io.on('connection' , (socket)=>{
    console.log('user conect');

    socket.on('new-user-join' , (name)=>{
      
      names[socket.id] = name;
        socket.emit('new-user-join' , `New User ${name} join the chat`);
   socket.broadcast.emit('new-user-join' , `New User ${name} join the chat`);
    })

    socket.on('send_masseg' , (masseg)=>{
        socket.broadcast.emit('recive-masseg' , `${names[socket.id]}  : ${masseg}`);
    })

    socket.on('disconnect' , ()=>{
       socket.broadcast.emit('new-user-join' , ` User ${names[socket.id]} left the chat`);
    })
})
server.listen(8000 , ()=>{
    console.log('http://localhost:8000');
    
})