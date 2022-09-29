
const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)

// Client
socket.on('welcome', data => {
    alert(data)
    socket.emit('answer', 'Mensaje recibido exitosamente')
})


socket.on('answer-server', data => {
    console.log(data);
})
