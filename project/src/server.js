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


//////////// CLI Args & dotENV ////////
import {
    SESSION_SECRET,
    SESSION_STORE_TTL,
    SESSION_STORE_MONGOURL,
    SESSION_COOKIE_HTTPONLY,
    SESSION_COOKIE_SECURE,
    SESSION_COOKIE_MAXAGE,
    SERVER_INTERFACE,
    SERVER_PORT as auxiliarServerPort,
} from './config/dotEnVar.js'
import { 
    server_port as primaryServerPort
} from './config/CLIarguments.js';


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
    secret: SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl: SESSION_STORE_MONGOURL,
        mongoOptions: advancedOptions,
        ttl: SESSION_STORE_TTL
    }),
    cookie: {
      httpOnly: SESSION_COOKIE_HTTPONLY,
      secure: SESSION_COOKIE_SECURE,
      maxAge: SESSION_COOKIE_MAXAGE,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

//-- Authentication ---//
app.use(passport.initialize());
app.use(passport.session());

//-- Client files (mw: static) --//
app.use(serveStatic(__dirname + '/../public')) ;
app.use(serveStatic(__dirname + '/../node_modules/bootstrap/dist'));
app.use(serveStatic(__dirname + '/../node_modules/ejs'));


////////// Routers (APIs & others) ////

import primaryRouter from './routes/primaryRouter.js';
app.use('/', primaryRouter);


//////////// Turn on server ///////////
const PORT = primaryServerPort || auxiliarServerPort;
const server = httpServer.listen(PORT, SERVER_INTERFACE, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port} con la interface ${server.address().address} `)
});
server.on('error', error => console.log(`Error en servidor ${error}`));
