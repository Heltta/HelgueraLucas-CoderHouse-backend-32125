import {
    Router
} from 'express';

const infoRouter = Router();

infoRouter.get('/', (req, res) => {
    res.render('./processInfo.pug');
})
infoRouter.get('/api/', (req, res) =>{
    res.status(200).send({
        arguments: process.argv,
        operatingSystem: process.platform,
        nodeVersion: process.version,
        reserverMemory: process.memoryUsage(),
        executionPath: process.execPath,
        processID: process.pid,
        projectFolder: process.cwd(),
    })

});

export default infoRouter;
