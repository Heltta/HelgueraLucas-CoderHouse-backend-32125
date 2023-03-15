import DatabaseClient from './databaseClient.js';
import mongoose from 'mongoose';
import { MONGO_URL } from '../../config/dotEnVar.js';
import logger from '../../config/logger.js';

class MongoDatabaseClient extends DatabaseClient {
    constructor() {
        super();
    }

    static #connectionStatus = false;

    static get isConnectedToDB() {
        return MongoDatabaseClient.#connectionStatus;
    }

    static set isConnectedToDB(newStatus) {
        if (typeof newStatus === 'boolean') {
            MongoDatabaseClient.#connectionStatus = newStatus;
        }
    }

    /**
     * Start a connection with MongoDB.
     *
     * Method is called from class constructor, if a connection with MongoDB is online,
     *  then, don't start another.
     *
     * @access     private
     * @static
     * @see #isConnectedToDB()
     * @see #changeConnectionStatus()
     */
    static connectDB() {
        const URL = MONGO_URL;
        if (!this.isConnectedToDB) {
            mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            this.isConnectedToDB = true;
            logger.info(`Started Conection with MongoDB`);
        }
    }

    static disconnectDB() {
        if (this.isConnectedToDB) {
            mongoose.disconnect(() => {
                logger.info(`Closed All connections with MongoDB`);
            });
            this.isConnectedToDB = false;
        }
    }
}

export default MongoDatabaseClient;
