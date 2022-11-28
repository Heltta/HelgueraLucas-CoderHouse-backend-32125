import { Router }  from 'express';
import passport from '../lib/passportSetUp.js';

// Define parent router
const authenticatorRouter = Router()
// Define children routers
const  logInRouter = Router();
const  signUpRouter = Router();

//-- LogIn Routes --/
logInRouter.get('/', (req, res) => {
    res.render('./login.pug');
});

logInRouter.post('/',
    passport.authenticate(
        'login',
        {
            failureMessage: true
        }
    )
);

logInRouter.get('/fail', (req, res) => {
    res.render('./login.pug');
});

//-- SignIn Routes --/
signUpRouter.get('/', (req, res) => {
    res.render('./signup.pug');
});

signUpRouter.post('/',
    passport.authenticate(
        'signup-local',
        { 
            failureMessage: true
        }
    )
);

signUpRouter.get('/fail', (req, res) => {
    res.render('./signup.pug');
});

// Set up children routes
authenticatorRouter.use('/login', logInRouter)
authenticatorRouter.use('/signup', signUpRouter)

export default authenticatorRouter;
