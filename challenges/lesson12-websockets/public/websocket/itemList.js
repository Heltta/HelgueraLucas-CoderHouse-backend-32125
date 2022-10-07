
// Start new websocket connection at the current web page URL
const socket = io();

// Identify functionality needs to server
socket.on('req-api-type', _ => {
    socket.emit('res-api-type', 'itemList');
})

socket.on('update-product-list', rawHTML => {
    const productSection = document.querySelector("#products");
    productSection.innerHTML = rawHTML;
})
