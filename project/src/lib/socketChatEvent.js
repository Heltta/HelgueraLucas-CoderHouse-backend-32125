import logger from '../config/logger.js';
import MessagesDao from '../daos/messagesDao.js';
import Message from '../models/message.js';
import UsersDao from '../daos/usersDao.js';
import User from '../models/user.js';

function attachChatEventToSocket(socket) {
    logger.info(`Chat event initialized at socket ${socket.id}`);

    socket.on('chat', async (callback) => {
        logger.info(`"chat" socket event triggered at socket ${socket.id}`);
        const sessionUser = socket.request.session.passport.user;
        const usersDao = UsersDao.getInstance();
        const messagesDao = MessagesDao.getInstance();
        const user = new User(
            await usersDao.findOne({ email: sessionUser.email })
        );

        try {
            const msgHistory = await messagesDao.getAll();
            callback(msgHistory);
            logger.info(`chat history sent`);
        } catch (error) {
            logger.error(error);
        }

        socket.on('new_user_message', async (data) => {
            logger.info(
                `"new_user_message" socket event triggered at socket ${socket.id}`
            );
            logger.info(`"new_user_message" content is ${data}`);
            const msg = new Message({ content: data, user: user });
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
