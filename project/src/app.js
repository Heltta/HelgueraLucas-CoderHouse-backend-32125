import 
    express, 
    { 
        static as serveStatic,
        json,
        urlencoded,
    }
from 'express';


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


//////////// CLI Args & dotENV ////////
import {
    SESSION_SECRET,
    SESSION_STORE_TTL,
    SESSION_STORE_MONGOURL,
    SESSION_COOKIE_HTTPONLY,
    SESSION_COOKIE_SECURE,
    SESSION_COOKIE_MAXAGE,
    ENVIRONMENT,
} from './config/dotEnVar.js'

/////////// Server config /////////////
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();


//////////// Middleware ///////////////

//-- Express middleware ---------//
app.use(json());
app.use(urlencoded({ extended:true }));

//-- Cookie, session, storage ---//
app.use(cookieParser());
app.use(flash());

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true};

const sessionConfig = {
    secret: SESSION_SECRET,
    cookie: {
      httpOnly: SESSION_COOKIE_HTTPONLY,
      secure: SESSION_COOKIE_SECURE,
      maxAge: SESSION_COOKIE_MAXAGE,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  }
  
if(ENVIRONMENT !== "test"){
    sessionConfig.store =
        MongoStore.create({
            mongoUrl: SESSION_STORE_MONGOURL,
            mongoOptions: advancedOptions,
            ttl: SESSION_STORE_TTL
        });
}

app.use(session(sessionConfig)
);

//-- Authentication ---//
app.use(passport.initialize());
app.use(passport.session());

//-- Client files (mw: static) --//
app.use(serveStatic(__dirname + '/../public')) ;
app.use(serveStatic(__dirname + '/../node_modules/bootstrap/dist'));
app.use(serveStatic(__dirname + '/../node_modules/ejs'));


////////// Routers (APIs & others) ////
import { requestInfo } from './middleware/logger.middleware.js';
import primaryRouter from './routes/primaryRouter.js';
app.use('/', requestInfo, primaryRouter);


export {
    app,
};
export default app;
