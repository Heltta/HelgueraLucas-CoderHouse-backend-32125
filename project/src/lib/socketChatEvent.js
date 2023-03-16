import logger from '../config/logger.js';
import MessagesDao from '../daos/messagesDao.js';
import Message from '../models/message.js';
import UsersGeneralDao from '../daos/usersDao.js';
import User from '../models/user.js';

function attachChatEventToSocket(socket) {
    logger.info(`Chat event initialized at socket ${socket.id}`);

    socket.on('chat', async (callback) => {
        logger.info(`"chat" socket event triggered at socket ${socket.id}`);
        const messagesDao = MessagesDao.getInstance();
        try {
            // const msgHistory = await messagesDao.getAll();
            const usersDao = UsersGeneralDao.getInstance();
            const allUsers = await usersDao.getAll();
            const msgHistory = [
                new Message({ user: allUsers[0], content: 'asdf asdf asdf' }),
                new Message({ user: allUsers[1], content: 'agagagaga alala' }),
            ];
            callback(msgHistory);
            logger.info(`chat history sent`);
        } catch (error) {
            logger.error(error);
        }
        socket.on('new_user_message', async (data) => {
            logger.info(
                `"new_user_message" socket event triggered at socket ${socket.id}`
            );
            const msg = new Message(data);
            try {
                await messagesDao.save(msg);
                logger.info(`new message sent`);
            } catch (error) {
                logger.error(error);
            }
            socket.broadcast.emit('new_user_message', msg);
        });
    });
}

export default attachChatEventToSocket;
