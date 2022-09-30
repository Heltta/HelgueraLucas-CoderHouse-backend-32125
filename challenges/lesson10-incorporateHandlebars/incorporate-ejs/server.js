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

app.set('view engine', 'ejs'); // register template engine
app.use(express.static("./public")) // set server public space

app.use(express.urlencoded({ extended: true}));

app.use('/productos', products);
app.use(express.static("./public"))

// const prodList = products.


// renderizo una vista de home
app.get('/',  (req, res) => {
    res.render('sendProduct', {});
});

// Start server
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));

