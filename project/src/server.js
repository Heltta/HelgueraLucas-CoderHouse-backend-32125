//////////// Winston logger ///////////
import logger from './config/logger.js';

//////////// Express srv app //////////
import { app } from './app.js';
import { Server as HttpServer } from 'http';
import setUpSocketServer from './socket.js';

const httpServer = new HttpServer(app);
setUpSocketServer(httpServer);

//////////// CLI Args & dotENV ////////
import {
    SERVER_INTERFACE,
    SERVER_PORT as auxiliarServerPort,
} from './config/dotEnVar.js';
import { server_port as primaryServerPort } from './config/CLIarguments.js';

//////////// Turn on server ///////////
const PORT = primaryServerPort || auxiliarServerPort;
const server = httpServer.listen(PORT, SERVER_INTERFACE, () => {
    logger.info(
        `Servidor http escuchando en el puerto ${
            server.address().port
        } con la interface ${server.address().address} `
    );
});
server.on('error', (error) => logger.error(`Error en servidor ${error}`));
