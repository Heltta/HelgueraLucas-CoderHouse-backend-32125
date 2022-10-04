const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dich a carpeta
app.use(express.static('./public'));
// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
});
// El servidor funcionando en el puerto 3000
const PORT = process.env.PORT || 3000;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));

//Server

// "connection" se ejecuta la primera vez que se abre una nueva conexión
io.on('connection', (socket) => {

    // Se imprimirá solo la primera vez que se ha abierto la conexión
    // Imprime la id del socket del nuevo usuario
    console.log(`New user connection: id = ${socket.id} `);

    // Saluda al usuario recién conectado
    socket.emit('welcome', `Hello client ${socket.id}, I am server`);
    
    socket.on('answer', data => {
        console.log(data);
        // Emite un mensaje a todos los usuarios conectados
        io.sockets.emit('answer-server', data);
    });

    //chat messages
    socket.on("chat", data=>{
        console.log(data);
        // Emite un mensaje a todos los usuarios conectados
        io.sockets.emit('answer-server', data);
    })
})

