
// Start new websocket connection at the current web page URL
const socketItems = io();

// Identify functionality needs to server
socketItems.on('req-api-type', _ => {
    socketItems.emit('res-api-type', 'itemList');
})

socketItems.on('update-product-list', rawHTML => {
    const productSection = document.querySelector("#products");
    productSection.innerHTML = rawHTML;
})
