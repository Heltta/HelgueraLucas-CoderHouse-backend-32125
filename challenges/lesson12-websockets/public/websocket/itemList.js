
// Start new websocket connection at the current web page URL
const socket = io();

// Identify functionality needs to server
socket.on('req-api-type', _ => {
    socket.emit('res-api-type', 'itemList');
})

const parseIntoRow = (id, name, price, thumbnail) =>{
    return `
    <tr>
        <th scope="row">${id}</th>
        <td>${name}</td>
        <td>${price}</td>
        <td>
            <img src="${thumbnail}" 
                alt="${name}" 
                width="64" 
                height="64">
        </td>
    </tr>
    `
}

socket.on('update-product-list', data => {
    console.log(data);

    if(data.length !== 0){
        console.log(data.length);
        //Write all items if not empty
        const tableBody = document.querySelector("#productTable tbody");
        tableBody.innerHTML = '';
        data.forEach( product => {
            tableBody.innerHTML = tableBody.innerHTML.concat(
                parseIntoRow(
                    product.id,
                    product.title,
                    product.price,
                    product.thumbnail,)
            )
        });
    };
    
})
