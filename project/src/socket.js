import { Server as IOServer } from 'socket.io';
import logger from './config/logger.js';

import { expressSession } from './config/sessionConfig.js';
import attachChatEventToSocket from './lib/socketChatEvent.js';

/**
 * Set ups a Socket server for an express app
 *
 * @param {httpServer} server
 */
function setUpSocketServer(server) {
    logger.info('Socket server configuration initialized');
    const io = new IOServer(server);
    io.use((socket, next) => {
        expressSession(socket.request, {}, next);
    });
    io.on('connection', (socket) => {
        logger.info(`New socket connection: ID = ${socket.id}`);
        /**
         * Requests client connection motive.
         *
         * Examples of motives are users' chat and managin products view.
         */
        socket.emit('api_type');
        attachChatEventToSocket(socket);
    });
    return io;
}

export default setUpSocketServer;
