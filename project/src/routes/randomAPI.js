import {
    Router
} from 'express';

//////////// Process imports //////////
import { fork } from 'child_process';

//////////// Static config libraries //
import { dirname } from 'path';
import { fileURLToPath } from 'url';

/////////// route config /////////////
const __dirname = dirname(fileURLToPath(import.meta.url));
const randomApiRouter = Router();

randomApiRouter.get('/', (req, res) => {
    const quantity = req.query.cant;
    const forked = fork(
        `${__dirname}/../lib/randomGenerator.js`,
        [`--quantity`, `${quantity}`]
    );
    forked.on('message', msg => {
        if(msg === 'ready') forked.send('start');
        else {
            res.send(msg);
            console.log('Non blocking calculation counter request finished');
        };
    })
})

export default randomApiRouter;
