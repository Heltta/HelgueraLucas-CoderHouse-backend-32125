///// Author Mock /////
const authorMock = 
{
    email: 'mock@gmail.com',
    name:'John',
    surname: 'Doe',
    age: 123,
    alias: 'JohDoe',
    avatar: 'https://static.wikia.nocookie.net/creepypasta-files/images/5/58/A52146fdaaa9e402bb2f3af0537d0dbc.png/revision/latest?cb=20180819210625',
    text: 'Lorem ipsum asd asdf'
}

///// Normalizr schemas/////
const authorSchema = new normalizr.schema.Entity('author');
const messageSchema = new normalizr.schema.Array( {
    author:  authorSchema ,
})

// const normChat = normalizr.normalize(chatHistory, messageSchema);
// Test if denormalize gives the same array as chatHistory 
// normalizr.denormalize(normChat.result, messageSchema, normChat.entities);

///// Log In control /////
let userEmail = null;
const setEmail = email => userEmail = email;
const userLogged = _ => userEmail !== null;
let socketChat;

const setUpChat = (userEmail) => {
    socketChat = websocket; // Ya podemos empezar a usar los sockets desde el cliente :)
        console.log(`chat-api websocket connection started`);
        // Send API type to server
        socketItems.emit('chat-api');

    setEmail(userEmail);

    const parseIntoList = ({author, text}) =>{
        return `
            <li>
                <span style="color: grey;">from ${author.id}:</span> ${text}
            </li>
        `
    }
        
    // Identify functionality needs to server
    socketChat.on('connect', _ => {
        // Print client socket ID at the start of a new connection
        console.log(`chat-api websocket connection started`);
        // Send API type to server
        socketItems.emit('chat-api');
    });
    
    socketChat.on('welcome', data => {
    
        if(data.length !== 0){
            console.log(data.length);
            //Write Chat History if not empty
            const chatBox = document.querySelector("#messages");
            const desData = normalizr.denormalize(data.result, messageSchema, data.entities);
            desData.forEach( msg => {
                chatBox.innerHTML = chatBox.innerHTML.concat(
                    parseIntoList(msg)
                )
            });
        };
    
        socketChat.emit('welcome-answer', {...authorMock, text:`User ${userEmail} has joined the chat`})
    })
    
    socketChat.on('server-broadcast', data => {
        const chatBox = document.querySelector("#messages");
        console.log(data);
        chatBox.innerHTML = chatBox.innerHTML.concat(
            parseIntoList(data)
        )
    })

    socketChat.onAny((eventName, ...args) => {
        console.log('eventName');
        console.log(eventName);
    });
}

//// Log in event ////
let login = document.querySelector("#login");
login.addEventListener("submit", e =>{
    e.preventDefault();
    const email = e.target.querySelector("#userMail").value;
    setUpChat(email);
})

//// Send message event ////
let MSGform = document.querySelector("#chat");
MSGform.addEventListener("submit", e =>{
    e.preventDefault();
    if(!userLogged()){
        alert("ingrese su correo para usar el chat")
    }
    else{
        const text = e.target.querySelector("#msg").value;
        socketChat.emit("chat", {...authorMock, text});
    }
})

