import {
    Router
} from 'express';

const baseRoute = Router();

let visitCounter = 0;
baseRoute.get('/', (req, res) =>{
    visitCounter++;
    res.send(`This endopoint has been visited ${visitCounter} times`)
})

export default baseRoute;
