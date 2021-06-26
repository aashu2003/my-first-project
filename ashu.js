var socket = io('http://localhost:8000');





var name = prompt('your name :');
// var room = prompt('your room :');

if(name)
socket.emit('new-user-join' , name );

socket.on('new-user-join' , (name)=>{
    let msg = document.createElement('p');
    msg.innerText = name;
    msg.setAttribute('class' , 'notice');

    document.getElementById('chatbox').appendChild(msg);
    
})

var sendmasseg  = ()=>{
    let mssg = document.getElementById('textbox').value;
    socket.emit('send_masseg' , mssg );
  
    let msg = document.createElement('p');
    msg.innerText = mssg;
    msg.setAttribute('class' , 'right');
    document.getElementById('chatbox').appendChild(msg);  mssg = '';
}

socket.on('recive-masseg' , (mssg)=>{
    let msg = document.createElement('p');
    msg.innerText = mssg;
    msg.setAttribute('class' , 'left');
    document.getElementById('chatbox').appendChild(msg);    
})


document.getElementById('sentbtn').addEventListener('click' , ()=>{
    sendmasseg();
})