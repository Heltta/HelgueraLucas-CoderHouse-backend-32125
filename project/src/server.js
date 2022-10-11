const express = require('express');

const app = express();


//////////// Template engine //////////
app.set('view engine', 'pug'); // register pug
app.set('views', './views'); // set template files folder


//////////// Middleware ///////////////
const products = require('./routes/products.js');
const cart = require('./routes/cart.js');
app.use('/api/productos', products);
app.use('/api/carrito', cart);
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('../public')) ;


//////////// Turn on server ///////////
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on('error', error => console.log(`Error en servidor ${error}`));
