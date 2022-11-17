import {
    Router
} from "express";
import session from "express-session";
import Error from "../models/error.js";

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
            res.send('Logout ok!');
        }
        else{
            res.status(500).send(new Error({
                code: 500, 
                description:'Session Logout has failed'
            }));
        }
    })
})

export default router;
