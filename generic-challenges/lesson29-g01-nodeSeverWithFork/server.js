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
//-- Cluster --//
import cluster from 'cluster';
import os from 'os';
const numCPUs = os.cpus().length;

import { server_port } from './config/CLIarguments.js';

if(cluster.isPrimary){
    console.log(`Master ${process.pid} is running`);

    //Fork workers
    for(let i=0; i<numCPUs; i++) cluster.fork();

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
} else {
    // Worker can share any TCP connection
    // In this case it is an HTTP server

    const PORT = server_port || 8080
    app.get('/', (req, res) =>{
        res.send(`Express server on Port ${PORT} - PID ${process.pid} - ${new Date()}`) 
    })

    //////////// Turn on server ///////////
    const server = httpServer.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
    });
    server.on('error', error => console.log(`Error en servidor ${error}`));

    console.log(`Worker ${process.pid} started`);
}
