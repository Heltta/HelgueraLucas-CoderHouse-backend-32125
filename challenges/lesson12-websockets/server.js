const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Load bootstrap
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// Load JSON parser
app.use(express.json());

// Load products api
app.set('view engine', 'pug'); // register template engine
app.set('views', './views'); // set template files folder

app.use(express.urlencoded({ extended: true}));

// Load products api routes
const products = require('./src/routes/products.js');
const dirProducts = '/productos';
app.use(dirProducts, products);

// Load chat api routes
const chat = require('./src/routes/chat.js')
app.use('/chat', chat);

// Set server public space
app.use(express.static("./public")) 

// renderizo una vista de home
app.get('/',  (req, res) => {
    res.render('./sendProduct.pug', {mensaje: 'Usando Pug JS en express'});
});

// Start express server
const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));

// Start websocket server

// "connection" se ejecuta la primera vez que se abre una nueva conexión
const msgHistory = [];
io.on('connection', (socket) => {
    
    // Se imprimirá solo la primera vez que se ha abierto la conexión
    // Imprime la id del socket del nuevo usuario
    console.log(`New user connection: id = ${socket.id} `);
    
    const sendProductList = (mode = 'response') =>{
                // Send all products
                const Container = require('./src/controllers/container.js');
                const pug = require("pug");
                const itemContainer = new Container('./uploads/productos.json');
                const event = 'update-product-list';
                
                itemContainer.getAll()
                    .then( rawItems => 
                        pug.renderFile('./views/partials/productsTable.pug',
                        {items: rawItems, listExists: _ => products.length !== 0})
                    )
                    .then( items => {
                        if(mode === 'response'){
                            socket.emit(event, items)
                        }
                        else if(mode === 'broadcast'){
                            io.sockets.emit(event, items)
                        }
                    })
                    .catch( error => console.log(error));
    }
    
    module.exports = sendProductList;

    // Ask client for api type (websocket for chat OR for updating the product list)
    socket.emit('req-api-type');

    // Ask recieve client api type
    socket.on('res-api-type', data => {
        console.log(data);
        if(data === 'itemList'){
            // Send all products to client
            sendProductList();
        }
        else if(data === 'chat'){
            // Send chat history to new client
            socket.emit('welcome', msgHistory);
        }
    })
    

    // Chat events
    socket.on('welcome-answer', data => {
        console.log(data);
        // Emite un mensaje a todos los usuarios conectados
        io.sockets.emit('server-broadcast', {socketId: socket.id, content: data});
        //Guarda en el servidor el nuevo mensaje
        msgHistory.push({socketId: socket.id, content: data});
    });

    //chat messages
    socket.on("chat", data=>{
        console.log(data);
        //Guarda en el servidor el nuevo mensaje
        msgHistory.push({
            socketId: socket.id,
            content: data.message,
            user: data.userEmail,
            date: Date()
        });
        // Emite un mensaje a todos los usuarios conectados
        io.sockets.emit('server-broadcast', {socketId: socket.id, content: data});
    })
})
