import express, 
    {
    json,
    urlencoded
    }
from 'express';

import { Server as HttpServer } from 'http';

const app = express();
const httpServer = new HttpServer(app);

//-- Express middleware ---------//
app.use(json());
app.use(urlencoded({ extended:true }));

//////////// Turn on server ///////////
import { server_port } from './config/CLIarguments.js';
const PORT = server_port || 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on('error', error => console.log(`Error en servidor ${error}`));
