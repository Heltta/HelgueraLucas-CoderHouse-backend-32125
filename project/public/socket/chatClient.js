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
    let ejsTemplate;
    try {
        fetchedTemplate = await fetch('views/templates/chatBox.ejs');
        ejsTemplate = await fetchedTemplate.text();
    } catch (error) {
        console.log(error);
    }

    // render fetched template
    applyRenderedTemplate({
        template: ejsTemplate,
        data: response,
        elementID: 'chat_box',
    });

    socket.on('new_user_message', (data) => {
        // add message to stream
        response.push(data);

        // update chat box
        applyRenderedTemplate({
            template: ejsTemplate,
            data: response,
            elementID: 'chat_box',
        });
    });
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
