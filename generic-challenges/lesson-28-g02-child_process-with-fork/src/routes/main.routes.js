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
    console.log('A visit counter request has been made');
    visitCounter++;
    res.send(`This endopoint has been visited ${visitCounter} times`)
    console.log('Visit counter request finished');
})

baseRoute.get('/calculation-blocking', (req, res)=>{
    console.log('A blocking calculation request has been made');
    summation();
    res.send('Bloquing sumatory finished');
    console.log('Blocking calculation counter request finished');
})

baseRoute.get('/calculation-noblocking', (req, res)=>{
    console.log('A non blocking calculation request has been made');
    const forked = fork(`${__dirname}/../childs/nonblocking.summation.js`);
    forked.on('message', msg => {
        if(msg === 'ready') forked.send('start');
        else {
            res.send('Non bloquing sumatory finished');
            console.log('Non blocking calculation counter request finished');
        };
    })
})

export default baseRoute;
