import logger from '../config/logger.js';

function attachChatEventToSocket(socket) {
    logger.info(`Chat event initialized at socket ${socket.id}`);

    socket.on('chat', async (callback) => {
        logger.info(`"chat" socket event triggered at socket ${socket.id}`);
        socket.on('new_user_message', async (data) => {
            logger.info(
                `"new_user_message" socket event triggered at socket ${socket.id}`
            );
        });
    });
}

export default attachChatEventToSocket;
