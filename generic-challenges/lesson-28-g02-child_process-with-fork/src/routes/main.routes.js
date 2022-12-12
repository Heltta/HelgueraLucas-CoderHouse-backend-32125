import {
    Router
} from 'express';

//////////// Process imports //////////
import { fork } from 'child_process';
import summation  from '../childs/summation.js';


//////////// Static config libraries //
import { dirname } from 'path';
import { fileURLToPath } from 'url';

/////////// Server config /////////////
const __dirname = dirname(fileURLToPath(import.meta.url));

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

baseRoute.get('/calculation-noblocking', (req, res)=>{
    const forked = fork(`${__dirname}/../childs/nonblocking.summation.js`);
    forked.on('message', msg => {
        if(msg === 'ready') forked.send('start');
        else {
            res.send('Non bloquing sumatory finished');
        };
    })
})

export default baseRoute;
