import MessagesDaoMongoDB from './messages/messagesDaoMongoDB.js';
import logger from '../config/logger.js';

import { DATA_STORAGE_TYPE as storageType } from '../config/dotEnVar.js';

let BaseClass;

if (storageType === 'MongoDB') {
    BaseClass = MessagesDaoMongoDB;
} else {
    logger.warn('MessageDao failed to found valid data source');
}

let instance = null; //needed for a singleton class

class MessagesGeneralDao extends BaseClass {
    constructor() {
        super();
    }
    static getInstance() {
        if (!instance) {
            instance = new MessagesGeneralDao();
        }
        return instance;
    }
}

export default MessagesGeneralDao;
