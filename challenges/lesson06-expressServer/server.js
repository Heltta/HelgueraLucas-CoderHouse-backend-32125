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

//Testing code
const contenedor = new Contenedor('./test/content.txt');
try{
    contenedor.save({producto:'Papas', cantidad:5})
}
catch(error){
    console.log(error);
}
