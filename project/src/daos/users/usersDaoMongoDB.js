import ContainerMongoDB from '../../controllers/containerMongoDB.js';
import { Schema, Types } from 'mongoose';

class UsersDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super('users');
    }

    /**
     * Creates schema for MongoDB
     *
     * @returns Schema
     */
    static mongoSchema() {
        return new Schema({
            id: Types.ObjectId,
            email: String,
            firstName: String,
            lastName: String,
            age: Number,
            password: String,
            phone: String,
            privilegesCategory: String,
            photo: String,
        });
    }
}

export default UsersDaoMongoDB;
