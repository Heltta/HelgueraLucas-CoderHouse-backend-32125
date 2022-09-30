const express = require('express');
const products = require('./api/products.js');

const app = express();

//same as app.use(express.json())
const { json } = express;
app.use(json());

app.use(express.urlencoded({ extended: true}));

app.use('/api/productos', products);
app.use(express.static("./public"))

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));

