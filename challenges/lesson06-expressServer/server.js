const express = require('express');
const Contenedor = require('./modules/contenedor');
const app = express();

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor ${error}`));

app.get('/', (req, res) => {
    res.send({ mensaje: 'hola mundo' })
});

let count =0;
app.get('/visitas', (req, res) => {
    count++;
    res.send({mensaje:"Hola visitante!", count});
})


const contenedor = new Contenedor('./db/productos.txt');

app.get('/productos', (req, res) => {
    contenedor.getAll()
        .then((products)=>res.send(products));
})

app.get('/productoRandom', (req, res) => {
    contenedor.getAll()
        .then((products)=>{
            const index = Math.round(Math.random() * (products.length-1)) ;
            res.send(products[index]);
        });
})
