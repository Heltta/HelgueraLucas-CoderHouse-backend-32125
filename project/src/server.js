//////////// Winston logger ///////////
import logger from './config/logger.js';

//////////// CLI Args & dotENV ////////
import {
    SERVER_INTERFACE,
    SERVER_PORT as auxiliarServerPort,
} from './config/dotEnVar.js'
import { 
    server_port as primaryServerPort
} from './config/CLIarguments.js';

//////////// Express srv app //////////
import { httpServer } from './app.js';

//////////// Turn on server ///////////
const PORT = primaryServerPort || auxiliarServerPort;
const server = httpServer.listen(PORT, SERVER_INTERFACE, () => {
    logger.info(`Servidor http escuchando en el puerto ${server.address().port} con la interface ${server.address().address} `)
});
server.on('error', error => logger.error(`Error en servidor ${error}`));
