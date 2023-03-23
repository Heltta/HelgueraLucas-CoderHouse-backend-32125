/* eslint-disable no-undef */
// import { render as ejsRender } from '/ejs.js';
const socket = io();
const { render } = ejs;

socket.emit('chat', (response) => {
    // Response contains chat message history
    renderMessages(response);
    document.getElementById('message_box').addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit(
            'new_user_message',
            document.getElementById('message').value
        );
    });
});

async function renderMessages(response) {
    // fetch ejs template for message
    const ejsTemplate = await fetchChatBoxTemplate();

    // render fetched template
    applyRenderedTemplate({
        template: ejsTemplate,
        data: response,
        elementID: 'chat_box',
    });

    socket.on('new_user_message', (data) => {
        // add message to stream
        response.push(data);

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
    });
}

async function fetchChatBoxTemplate() {
    try {
        const fetchedTemplate = await fetch('views/templates/chatBox.ejs');
        const ejsTemplate = await fetchedTemplate.text();
        return ejsTemplate;
    } catch (error) {
        console.log(error);
    }
}

function applyRenderedTemplate({
    template,
    data,
    elementID = 'chat_box',
} = {}) {
    // render fetched template
    let renderedView = render(template, { messages: data });
    const elementDOM = document.getElementById(elementID);
    elementDOM.innerHTML = renderedView;
}
