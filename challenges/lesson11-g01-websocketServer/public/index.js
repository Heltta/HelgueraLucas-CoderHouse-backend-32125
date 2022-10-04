
const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)

// Client
socket.on('welcome', data => {
    alert(data)
    socket.emit('answer', 'Gracias por recibirme')
})


socket.on('answer-server', data => {
    //console.log(data);
    const chatBox = document.querySelector("#messages");
    chatBox.innerHTML = chatBox.innerHTML.concat(
        `<span style="color: grey;">
            from: ${data.socketId}
        </span>`,
        `<span> 
            ${data.content}
        </span><br>`);
})

let MSGform = document.querySelector("#chat");
MSGform.addEventListener("submit", e =>{
    e.preventDefault();
    const message = e.target.querySelector("#msg").value;
    socket.emit("chat", message);
})
