
const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)

const parseIntoList = (sender, content) =>{
    return `
        <li>
            <span style="color: grey;">from ${sender}:</span> ${content}
        </li>
    `
}

// Client
socket.on('welcome', data => {

    if(data.length !== 0){
        console.log(data.length);
        //Write Chat History if not empty
        const chatBox = document.querySelector("#messages");
        data.forEach( msg => {
            chatBox.innerHTML = chatBox.innerHTML.concat(
                parseIntoList(msg.socketId, msg.content)
            )
        });
    };

    socket.emit('welcome-answer', 'Gracias por recibirme')
})


socket.on('server-broadcast', data => {
    const chatBox = document.querySelector("#messages");
    chatBox.innerHTML = chatBox.innerHTML.concat(
        parseIntoList(data.socketId, data.content)
    )
})

let MSGform = document.querySelector("#chat");
MSGform.addEventListener("submit", e =>{
    e.preventDefault();
    const message = e.target.querySelector("#msg").value;
    socket.emit("chat", message);
})
