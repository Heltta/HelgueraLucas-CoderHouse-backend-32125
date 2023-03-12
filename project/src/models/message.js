import { Types } from 'mongoose';
import User from './user';

class Message {
    constructor({ id, user, timestamp, content }) {
        this.id = (Types.ObjectId(id) || Types.ObjectId())?.toString();
        this.timestamp = timestamp ? new Date(timestamp) : new Date();
        this.user = user instanceof User ? new User({ ...user }) : undefined;
        this.content = typeof content === 'string' ? content : '';
    }
}

export default Message;
