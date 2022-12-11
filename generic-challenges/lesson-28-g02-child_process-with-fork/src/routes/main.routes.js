import {
    Router
} from 'express';

import summation  from '../childs/summation.js';

const baseRoute = Router();

let visitCounter = 0;
baseRoute.get('/', (req, res) =>{
    visitCounter++;
    res.send(`This endopoint has been visited ${visitCounter} times`)
})

baseRoute.get('/calculation-blocking', (req, res)=>{
    summation();
    res.send('Bloquing sumatory finished');
})

export default baseRoute;
