import {
    Router
} from "express";
import session from "express-session";
import Error from "../models/error.js";
import {
    authAdmin,
    checkUserLogged,
} from "../middleware/authenticatorMW.js";

const router = Router();


router.get('/counter', (req, res) => {
    if(req.session.counter) {
        req.session.counter++;
        res.send(`You have visited this site ${req.session.counter} times`);
    }
    else {
        req.session.counter = 1;
        res.send('Welcome new visitor');
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy( err => {
        if( !err ) {
            res.redirect('/');
        }
        else{
            res.status(500).send(new Error({
                code: 500, 
                description:'Session Logout has failed'
            }));
        }
    })
})

router.post('/login', checkUserLogged, (req, res) => {
    const { username, password } = req.query;
    if(username !== 'pepe' || password !== 'pepepass'){
        return res.status(500).send(new Error({
            code: 500,
            description:'login failed'
        }));
    }

    req.session.user = username;
    req.session.admin = true;
    res.status(200).redirect('/home');
})

router.get('/admin/check', authAdmin, (req, res) =>{
    res.status(200).send('User is logged as admin');    
})

export default router;
