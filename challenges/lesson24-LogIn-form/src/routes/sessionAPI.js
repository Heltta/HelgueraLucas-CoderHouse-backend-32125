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
export default router;
