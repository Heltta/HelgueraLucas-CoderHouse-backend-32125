/* eslint-disable no-undef */
// import { render as ejsRender } from '/ejs.js';
const socket = io();
const { render } = ejs;

socket.emit('chat', (response) => {
    // Response contains chat message history
    // chat history needs to be rendered with ejs
    console.log('placeholder for chat history render');
    console.log(response);
    renderMessages(response);
    document.getElementById('message_box').addEventListener('submit', () => {
        socket.emit(
            'new_user_message',
            document.getElementById('message').value
        );
    });
});

async function renderMessages(response) {
    // fetch ejs template for message
    let ejsTemplate;
    try {
        ejsTemplate = await fetch('views/templates/chatBox.ejs')
            .then((res) => res.text())
            .catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
    }

    // render fetched template
    let renderedView = render(ejsTemplate, { messages: response });
    const elementDOM = document.getElementById('chat_box');
    elementDOM.innerHTML = renderedView;

    socket.on('new_user_message', (data) => {
        // render message with ejs
        console.log('placeholder for new user message');
        console.log(data);
    });
}
