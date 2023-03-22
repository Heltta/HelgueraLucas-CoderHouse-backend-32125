import express, { static as serveStatic, json, urlencoded } from 'express';

//////////// Static config libraries ////
import { dirname } from 'path';
import { fileURLToPath } from 'url';

//////////// Parsers libraries //////////
import cookieParser from 'cookie-parser';

//////////// (other) Middleware /////////
import flash from 'express-flash';
import passport from './lib/passportSetUp.js';

/////////// Server config /////////////
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

//////////// Template engine //////////
app.set('views', './src/views');
app.set('view engine', 'pug');

//////////// Middleware ///////////////

//-- Express middleware ---------//
app.use(json());
app.use(urlencoded({ extended: true }));

//-- Cookie, session, storage ---//
app.use(cookieParser());
app.use(flash());

import { expressSession } from './config/sessionConfig.js';
app.use(expressSession);

//-- Authentication ---//
app.use(passport.initialize());
app.use(passport.session());

//-- Client files (mw: static) --//
app.use(serveStatic(__dirname + '/../public'));
app.use(serveStatic(__dirname + '/../node_modules/bootstrap/dist'));
app.use(serveStatic(__dirname + '/../node_modules/ejs'));

////////// Routers (APIs & others) ////
import { requestInfo } from './middleware/logger.middleware.js';
import primaryRouter from './routes/primaryRouter.js';
app.use('/', requestInfo, primaryRouter);

export { app };
export default app;
