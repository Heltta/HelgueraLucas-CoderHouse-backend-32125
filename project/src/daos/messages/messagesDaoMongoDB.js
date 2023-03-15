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
            user: UserSchema,
            content: String,
        });
    };

    mongoUserParametersToModel(mongoUserParameters) {
        const { _id, ...objData } = mongoUserParameters;
        return new UserModel({ id: _id, ...objData });
    }

    userToDestructForMongo(user) {
        const { id, ...objData } = user;
        return { _id: id, ...objData };
    }

    mongoMessageParametersToModel(mongoMessage) {
        const parsedUser = this.mongoUserParametersToModel(
            mongoMessage.user._doc
        );
        const parsedMessageParameters = {
            ...mongoMessage,
            user: parsedUser,
        };
        return new MessageModel(parsedMessageParameters);
    }

    messageToDestructForMongo(message) {
        const parsedUser = this.userToDestructForMongo(message.user);
        const parsedMessage = { ...message, users: parsedUser };
        return parsedMessage;
    }

    async save(rawMessage) {
        try {
            const parsedMessage = this.messageToDestructForMongo(rawMessage);
            return await super.save(parsedMessage);
        } catch (error) {
            logger.error(error);
        }
    }

    async getById(id) {
        try {
            const rawMessage = await super.getById(id);
            return this.mongoMessageParametersToModel(rawMessage);
        } catch (error) {
            logger.error(error);
        }
    }
}

export default MessagesDaoMongoDB;
