import 
    express, 
    { 
        static as serveStatic,
        json,
        urlencoded,
    }
from 'express';

import { Server as HttpServer } from 'http';
import { Server as IOServer }  from 'socket.io';

import { SERVER_PORT as DefaultPORT } from './config/dotEnVar.js'

//////////// Template engine //////////
import pug from 'pug';

//////////// Static config libraries ////
import { dirname } from 'path';
import { fileURLToPath } from 'url';

//////////// Parsers libraries //////////
import normalizr  from 'normalizr';
import cookieParser from 'cookie-parser';

//////////// Session libraries //////////
import session from 'express-session';
import MongoStore from 'connect-mongo';

//////////// (other) Middleware /////////
import flash from 'express-flash';
import passport from './lib/passportSetUp.js';

//////////// Model imports ////////////
import Error from './models/error.js';
import Product from './models/product.js';

//////////// Controllers imports //////
import ContainerMongo from './controllers/containerMongoDB.js';


/////////// Server config /////////////
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


//////////// Middleware ///////////////

//-- Express middleware ---------//
app.use(json());
app.use(urlencoded({ extended:true }));

//-- Cookie, session, storage ---//
app.use(cookieParser());
app.use(flash());
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true};
app.use(session({
    secret: "keyboard cat",
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/test',
        mongoOptions: advancedOptions,
        ttl: 60 * 5 //  seconds
    }),
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 60000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

//-- Custom APIs ---------------//
import productsRoutes from './routes/productsAPI.js';
import cart from './routes/cartsAPI.js';
app.use('/api/products', productsRoutes);
app.use('/api/cart', cart);
//-- Info routes --/
import infoRouter from './routes/processInfo.js';
app.use('/info', infoRouter);
//-- Tests routes --/
import testsRouter from './routes/tests.js';
app.use('/test', testsRouter);


//-- Authentication ---//
app.use(passport.initialize());
app.use(passport.session());

//-- Client files (mw: static) --//
app.use(serveStatic(__dirname + '/../public')) ;
app.use(serveStatic(__dirname + '/../node_modules/bootstrap/dist'));
app.use(serveStatic(__dirname + '/../node_modules/ejs'));

//////////// Other routes /////////////

const isAuth = (req,res,next) => {
  if(req.isAuthenticated()) next();
  else res.redirect("/auth/login");
};

//-- Authenticator routes --/
import authenticatorRouter from './routes/authenticator.js';
app.use('/auth', authenticatorRouter);

//-- Home routes --/
app.get('/home', isAuth, (req, res) => {
    res.render(
        './home.pug',
        {
            loggedUser: req.user.username
        }
    );
});

//-- Handle Not Implemented requests --/
app.all('/*', (req, res) => {
    res.status(501).send(new Error({
        code:501,
        description:'Error: The server does not support the functionality required to fulfill the request'
    }))
})

//////////// Turn on server ///////////
const PORT = DefaultPORT || 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on('error', error => console.log(`Error en servidor ${error}`));
