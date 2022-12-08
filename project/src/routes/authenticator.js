import { Router }  from 'express';
import passport from '../lib/passportSetUp.js';
import Error from '../models/error.js';

// Define parent router
const authenticatorRouter = Router()
// Define children routers
const  logInRouter = Router();
const  signUpRouter = Router();
const  logOutRouter = Router();

const islogged = (req,res,next) => {
    if(req.isAuthenticated()) res.redirect("/home");
    else next();
}

//-- LogIn Routes --/
logInRouter.get(
    '/',
    islogged,
    (req, res) => {
        res.render('./login.pug');
});

logInRouter.post(
    '/',
    islogged,
    passport.authenticate(
        'login',
        {
            failureFlash: true,
            successRedirect: '/home',
            failureRedirect: './login/fail'
        }
    )
);

logInRouter.get('/fail', (req, res) => {
    res.render(
        './error.pug',{
        error: new Error({
            code: 300,
            description: "Log in error",
        })}
    );
});

//-- SignIn Routes --/
signUpRouter.get('/', islogged, (req, res) => {
    res.render('./signup.pug');
});

signUpRouter.post('/', islogged,
    passport.authenticate(
        'signup-local',
        {
            failureFlash: true,
            successRedirect: '/home',
            failureRedirect: './signup/fail',
        }
    )
);

signUpRouter.get('/fail', (req, res) => {
    res.render(
        './error.pug',{
        error: new Error({
            code: 300,
            description: "Sign up error",
        })}
    );
});

//-- SignIn Routes --/
logOutRouter.get('/', (req, res) =>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
})

// Set up children routes
authenticatorRouter.use('/login', logInRouter)
authenticatorRouter.use('/signup', signUpRouter)
authenticatorRouter.use('/logout', logOutRouter);

export default authenticatorRouter;
