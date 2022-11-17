
// Start new websocket connection at the current web page URL
const socketItems = websocket;

socketItems.on("connect", _ => {
    // Print client socket ID at the start of a new connection
    console.log(`itemList-api websocket connection started`);
    // Send API type to server
    socketItems.emit('itemList-api');
});

socketItems.on('update-product-list', rawHTML => {
    const productSection = document.querySelector("#products");
    productSection.innerHTML = rawHTML;
})

socketItems.onAny((eventName, ...args) => {
    console.log('eventName');
    console.log(eventName);
});
