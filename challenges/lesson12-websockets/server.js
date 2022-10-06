const express = require('express');
const products = require('./src/routes/products.js');

const app = express();

// Load bootstrap
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// Load JSON parser
app.use(express.json());

// Load products api
app.set('view engine', 'pug'); // register template engine
app.set('views', './views'); // set template files folder

app.use(express.urlencoded({ extended: true}));

// Load products api
const dirProducts = '/productos';
app.use(dirProducts, products);

// Set server public space
app.use(express.static("./public")) 

// renderizo una vista de home
app.get('/',  (req, res) => {
    res.render('./sendProduct.pug', {mensaje: 'Usando Pug JS en express'});
});

// Start server
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));

