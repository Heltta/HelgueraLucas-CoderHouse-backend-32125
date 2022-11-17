import express, { json, urlencoded, static as serveStatic } from 'express';
import normalizr  from 'normalizr';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Error from './models/error.js';

import { Server as HttpServer } from 'http';
import { Server as IOServer }  from 'socket.io';

import pug from 'pug';
import Container from './controllers/container.js';
import ContainerMongo from './controllers/containerMongoDB.js';
import Product from './models/product.js';
import Message from './models/message.js';

import {faker} from '@faker-js/faker';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//////////// Template engine //////////
app.set('view engine', 'ejs'); // register pug


//////////// Middleware ///////////////
//-- Express middleware ---------//
app.use(json());
app.use(urlencoded({ extended:true }));
//-- Custom APIs ---------------//
import products from './routes/productsAPI.js';
import chat from './routes/chat.js';
app.use('/api/products', products);
app.use('/chat', chat);
//-- Client files (mw: static) --//
app.use(serveStatic(__dirname + '/../public')) ;
app.use(serveStatic(__dirname + '/../node_modules/bootstrap/dist'));
app.use(serveStatic(__dirname + '/../node_modules/ejs'));

// renderizo una vista de home
app.get('/',  (req, res) => {
    res.render('./home.pug');
});

app.get('/api/products-test', (req, res) => {
    const fakeProducts = [];
    for(let i=0;i<5;i++){
        const fakeProd = new Product({
            id: faker.datatype.number(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.datatype.uuid(),
            photoURL: faker.image.imageUrl(),
            price: faker.commerce.price(),
            stock: faker.datatype.number({ min: 100, max: 8000})
        })
        fakeProducts.push(fakeProd);
    };
    res.status(302).send(fakeProducts);
})

//-- Handle Not Implemented requests --/
app.all('/*', (req, res) => {
    res.status(501).send(new Error({
        code:501,
        description:'Error: The server does not support the functionality required to fulfill the request'
    }))
})


//////////// Turn on server ///////////
const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on('error', error => console.log(`Error en servidor ${error}`));

//////////// Websocket server /////////

const messagesTable = new ContainerMongo('messages', Message);
import { products as itemContainer } from './routes/productsAPI.js'

// "connection" se ejecuta la primera vez que se abre una nueva conexión
io.on('connection', (socket) => {
    
    // Print client socket ID at the start of a new connection
    console.log(`New user connection:\n\tid = ${socket.id} `);

    // Print client socket ID and disconect reason when they disconnect
    socket.on('disconnect', (reason) => {
        console.log(`User has disconnected:\n\tid = ${socket.id}\n\treason = ${reason} `);
    })

    socket.on('itemList-api', _ => {
        console.log(`Connection of id ${socket.id} is for itemList`)
        // Send all products clients
        itemContainer.getAll()
            .then( rawItems => 
                pug.renderFile('./views/partials/productsTable.pug',
                    {items: rawItems, listExists: _ => products.length !== 0})
            )
            .then( items => {
                socket.emit('update-product-list', items)
            })
            .catch( error => console.log(error));
    })

    socket.on('chat-api', _ => {
        console.log(`Connection of id ${socket.id} is for chat`)
        // Send chat history to new client
        messagesTable.getAll().then( chatHistory => {

            const authorSchema = new normalizr.schema.Entity('author');
            const messageSchema = new normalizr.schema.Array( {
                author:  authorSchema ,
            })
            const normChat = normalizr.normalize(chatHistory, messageSchema);
            // Test if denormalize gives the same array as chatHistory 
            // normalizr.denormalize(normChat.result, messageSchema, normChat.entities);
            socket.emit('welcome', normChat, (response) => {
                console.log(response); // "got it"
              });
        });

        // Chat events
        socket.on('welcome-answer', data => {
            const msg = new Message(
                data
            )
    
            //Guarda en el servidor el nuevo mensaje
            messagesTable.save(msg);
            // Emite un mensaje a todos los usuarios conectados
            io.sockets.emit('server-broadcast', msg);
        });
        //chat messages
        socket.on("chat", data=>{
            //Guarda en el servidor el nuevo mensaje
            const msg = new Message(
                data
            )
    
            //Guarda en el servidor el nuevo mensaje
            messagesTable.save(msg);
            // Emite un mensaje a todos los usuarios conectados
            io.sockets.emit('server-broadcast', msg);
        })

    })
})