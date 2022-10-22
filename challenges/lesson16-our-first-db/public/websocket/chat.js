
let userEmail = null;
const setEmail = email => userEmail = email;
const userLogged = _ => userEmail !== null;
let socketChat;
const setUpChat = (userEmail) => {
    socketChat = io(); // Ya podemos empezar a usar los sockets desde el cliente :)

    setEmail(userEmail);

    const parseIntoList = (socketID, content, user, date) =>{
        return `
            <li>
                <span style="color: grey;">from ${user} ${date}:</span> ${content}
            </li>
        `
    }
        
    // Identify functionality needs to server
    socketChat.on('req-api-type', _ => {
        socketChat.emit('res-api-type', 'chat');
    })
    
    socketChat.on('welcome', data => {
    
        if(data.length !== 0){
            console.log(data.length);
            //Write Chat History if not empty
            const chatBox = document.querySelector("#messages");
            data.forEach( msg => {
                chatBox.innerHTML = chatBox.innerHTML.concat(
                    parseIntoList(msg.socketId, msg.content, msg.user, msg.date)
                )
            });
        };
    
        socketChat.emit('welcome-answer', {message:'Gracias por recibirme' , userEmail})
    })
    
    socketChat.on('server-broadcast', data => {
        const chatBox = document.querySelector("#messages");
        console.log(data);
        chatBox.innerHTML = chatBox.innerHTML.concat(
            parseIntoList(data.socketId, data.content, data.user, data.date)
        )
    })
}



let login = document.querySelector("#login");
login.addEventListener("submit", e =>{
    e.preventDefault();
    const email = e.target.querySelector("#userMail").value;
    setUpChat(email);
})

let MSGform = document.querySelector("#chat");
MSGform.addEventListener("submit", e =>{
    e.preventDefault();
    if(!userLogged()){
        alert("ingrese su correo para usar el chat")
    }
    else{
        const message = e.target.querySelector("#msg").value;
        socketChat.emit("chat", {message, userEmail});
    }
})

