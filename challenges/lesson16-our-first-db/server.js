import express, { json, urlencoded, static as serveStatic } from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Error from './models/error.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();


//////////// Template engine //////////
app.set('view engine', 'ejs'); // register pug


//////////// Middleware ///////////////
//-- Express middleware ---------//
app.use(json());
app.use(urlencoded({ extended:true }));
//-- Custom APIs ---------------//
import products from './routes/productsAPI.js';
import cart from './routes/cartsAPI.js';
app.use('/api/products', products);
app.use('/api/cart', cart);
//-- Client files (mw: static) --//
app.use(serveStatic(__dirname + '/../public')) ;
app.use(serveStatic(__dirname + '/../node_modules/bootstrap/dist'));
app.use(serveStatic(__dirname + '/../node_modules/ejs'));
//-- Handle Not Implemented requests --/
app.all('/*', (req, res) => {
    res.status(501).send(new Error({
        code:501,
        description:'Error: The server does not support the functionality required to fulfill the request'
    }))
})

//////////// Turn on server ///////////
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on('error', error => console.log(`Error en servidor ${error}`));
