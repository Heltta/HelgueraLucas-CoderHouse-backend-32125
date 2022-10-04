
const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)

// Client
socket.on('welcome', data => {
    alert(data)
    socket.emit('answer', 'Mensaje recibido exitosamente')
})


socket.on('answer-server', data => {
    console.log(data);
})

let MSGform = document.querySelector("#chat");
MSGform.addEventListener("submit", e =>{
    e.preventDefault();
    const message = e.target.querySelector("#msg").value;
    socket.emit("chat", message);
})
