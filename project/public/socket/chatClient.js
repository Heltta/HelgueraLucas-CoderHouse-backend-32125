/* eslint-disable no-undef */
// import { render as ejsRender } from '/ejs.js';
const socket = io();
const { render } = ejs;

let ejsTemplate;

socket.emit('chat', async (response) => {
    // Response contains chat message history

    // fetch ejs template for message
    ejsTemplate = await fetchChatBoxTemplate();

    // Render chat history inside chat_box
    renderMessages(response);

    // Attach event for new user message to socket
    attachNewUserMsgEventToSocket(socket);

    // Change form submit event to emit new message
    alterFormSubmitToEmitMessage(socket);
});

function renderMessages(messages) {
    // render fetched template
    let renderedView = render(ejsTemplate, { messages: messages });
    const elementDOM = document.getElementById('chat_box');
    elementDOM.innerHTML = renderedView;
}

async function fetchChatBoxTemplate() {
    try {
        const response = await fetch('views/templates/chatBox.ejs');
        const receivedTemplate = await response.text();
        return receivedTemplate;
    } catch (error) {
        console.log(error);
    }
}

function alterFormSubmitToEmitMessage(socket) {
    // Change form submit event to emit new message
    document.getElementById('message_box').addEventListener('submit', (e) => {
        e.preventDefault();
        const messageField = document.getElementById('message');
        if (messageField.value) {
            socket.emit('new_user_message', messageField.value);
            messageField.value = '';
        } else {
            console.warn('Tried to send empty message');
        }
    });
}

function attachNewUserMsgEventToSocket(socket) {
    // Attach event for new user message to socket
    socket.on('new_user_message', (data) => {
        // add message to stream
        response.push(data);

        // Update chat content inside chat_box
        renderMessages(response);
    });
}
