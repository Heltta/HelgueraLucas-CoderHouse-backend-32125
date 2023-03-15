import { Schema, Types } from 'mongoose';
import logger from '../../config/logger.js';

import ContainerMongoDB from '../../controllers/containerMongoDB.js';
import UsersDaoMongoDB from '../users/usersDaoMongoDB.js';
import MessageModel from '../../models/message.js';
import UserModel from '../../models/user.js';

class MessagesDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super('messages');
    }

    static mongoSchema = () => {
        const UserSchema = UsersDaoMongoDB.mongoSchema();
        return new Schema({
            id: Types.ObjectId,
            timestamp: { type: Date, default: Date.now },
            user: [UserSchema],
        });
    };

    async save(rawMessage) {
        try {
            const parsedUsers = rawMessage?.users.map((rawUser) => {
                const { id, ...objData } = rawUser;
                return { _id: id, ...objData };
            });
            const parsedMessage = { ...rawMessage, users: parsedUsers };
            return await super.save(parsedMessage);
        } catch (error) {
            logger.error(error);
        }
    }

    async getById(id) {
        try {
            const rawMessage = await super.getById(id);
            const parsedUsers = rawMessage?.users.map((rawUser) => {
                const { _id, ...objData } = rawUser._doc;
                return new UserModel({ id: _id, ...objData });
            });
            const parsedMessage = { ...rawMessage, users: parsedUsers };
            return new MessageModel(parsedMessage);
        } catch (error) {
            logger.error(error);
        }
    }
}

export default MessagesDaoMongoDB;
