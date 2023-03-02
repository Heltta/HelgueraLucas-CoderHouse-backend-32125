import { Router } from 'express';

import Error from '../models/error.js';

const primaryRouter = Router();

//-- Route protection --//
import routeProtector from '../middleware/routeProtection.js';

////////// Routers (APIs & others) ////

//-- Products router --/
import productsRoutes from './productsAPI.js';
primaryRouter.use('/api/products', productsRoutes);

//-- Cart router --/
import cart from './cartsAPI.js';
primaryRouter.use('/api/cart', cart);

//-- Random Api router --/
import randomApiRouter from './randomAPI.js';
primaryRouter.use('/api/random', randomApiRouter);

//-- Info router --/
import infoRouter from './processInfo.js';
primaryRouter.use('/info', infoRouter);

//-- Tests router --/
import testsRouter from './tests.js';
primaryRouter.use('/test', testsRouter);

//-- Authenticator routes --/
import authenticatorRouter from './authenticator.js';
primaryRouter.use('/auth', authenticatorRouter);

//-- Home routes --/
primaryRouter.get('/', (req, res) => {
    res.render('./home.pug', {
        loggedUser: req.user?.username,
    });
});

primaryRouter.get('/home', routeProtector.onlyAuthenticated, (req, res) => {
    res.render('./main.pug', {
        loggedUser: req.user.username,
    });
});

//-- Handle Not Implemented requests --/
import { reqNotImplementedWarn } from '../middleware/logger.middleware.js';
primaryRouter.all('*', reqNotImplementedWarn, (req, res) => {
    res.status(501).send(
        new Error({
            code: 501,
            description:
                'Error: The server does not support the functionality required to fulfill the request',
        })
    );
});

export default primaryRouter;
