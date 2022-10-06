const express = require('express');
const { Server: HttpServer } = require('http');
const products = require('./api/products.js');

const app = express();
const httpServer = new HttpServer(app);

// Load static files
app.use(express.static("./public"))

// Load bootstrap
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// Load JSON parser
app.use(express.json());

// Load products api
const dirProducts = '/productos';
app.use(dirProducts, products);

//Set up template engine 
app.set('view engine', 'pug'); // register template engine
app.set('views', './views'); // set template files folder

app.use(express.urlencoded({ extended: true}));

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

