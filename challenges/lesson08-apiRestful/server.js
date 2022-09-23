const express = require('express');
const Contenedor = require('./modules/productos');

const app = express();
const { json } = express;

app.use(json());

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

const products = new Contenedor('./uploads/productos.json');

app.get('/api/productos', (req, res) => {
    products.getAll()
        .then((products)=>res.send(products));
})

app.get('/api/productos/:id', (req, res) => {
    products.getById(parseInt(req.params.id))
        .then((product)=>res.send(product));
})

app.post('/api/productos', (req, res) => {
    const prod = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    res.status(102);
    products.save(prod)
        .then((id)=> res.status(201).send({ id }))
        .catch( error => console.log(error));
})