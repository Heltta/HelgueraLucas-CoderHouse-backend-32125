const express = require('express');

const app = express();


//////////// Template engine //////////
app.set('view engine', 'ejs'); // register pug


//////////// Middleware ///////////////
//-- Custom APIs ---------------//
const products = require('./routes/products.js');
const cart = require('./routes/cart.js');
app.use('/api/productos', products);
app.use('/api/carrito', cart);
//-- Express middleware ---------//
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
//-- Client files (mw: static) --//
app.use(express.static(__dirname + '/../public')) ;
app.use(express.static(__dirname + '/../node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/../node_modules/ejs'));


//////////// Turn on server ///////////
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on('error', error => console.log(`Error en servidor ${error}`));
