const express = require('express');
const products = require('./api/products.js');

const app = express();

//load bootstrap
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

//same as app.use(express.json())
const { json } = express;
app.use(json());

//load products api
const dirProducts = '/api/productos';
app.use(dirProducts, products);

app.set('view engine', 'pug'); // register template engine
app.set('views', './views'); // set template files folder
app.use(express.static("./public")) // set server public space

app.use(express.urlencoded({ extended: true}));

app.use('/productos', products);
app.use(express.static("./public"))


// renderizo una vista de home
app.get('/',  (req, res) => {
    res.render('hello.pug', {mensaje: 'Usando Pug JS en express'});
});

// Start server
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));

