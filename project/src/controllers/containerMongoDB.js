import mongoose, { connect } from 'mongoose';
import { MONGO_URL } from '../config/dotEnVar.js';
import logger from '../config/logger.js';

class Container {
    constructor(collectionName, modelClass) {
        // Precondition: modelClass has as method for creating a schema
        // in MongoDB

        this.coll = collectionName;
        Container.connectDB();
        this.model = mongoose.model(collectionName, modelClass.mongoSchema());
    }

    static #connectionStatus = false;

    static get isConnectedToDB() {
        return Container.#connectionStatus;
    }

    static set isConnectedToDB(newStatus) {
        if (typeof newStatus === 'boolean') {
            Container.#connectionStatus = newStatus;
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
            mongoose.disconnect((_) => {
                logger.info(`Closed All connections with MongoDB`);
            });
            this.isConnectedToDB = false;
        }
    }

    async #findDocuments(objCondition = {}) {
        // Seach all docs from container collection stored at DB that pass a condition.
        // If not condition is passed, then return all docs inside the collection.
        try {
            const modelList = await this.model.find(objCondition);
            if (modelList.length === 0) return null;
            else return modelList.map((model) => model._doc);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async #insertDocument(obj) {
        // Insert object as a row into table
        const { id, ...objData } = obj;
        try {
            const newModel = new this.model({ _id: id, ...objData });
            let objSave = await newModel.save();
            return objSave._id;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async #updateDocuments(objCondition, obj) {
        // Update all rows from table stored at DB that pass a condition
        // from a data object and return updated fields
        try {
            for (const prop in obj) {
                if (!obj[prop]) {
                    delete obj[prop];
                }
            }

            const rows = await this.model.updateOne(objCondition, obj);

            return rows;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async #deleteDocument(objCondition) {
        // Delete a row from table using object syntax
        try {
            const request = await this.model.deleteOne(objCondition);
            return request.deletedCount;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async save(data) {
        // Store object data as a row into table
        try {
            return await this.#insertDocument(data);
        } catch (error) {
            logger.error(error);
        }
    }

    async overwriteById(id, objData) {
        // Update a document given id.
        // objData parameter contains the keys of the fields
        // and the new content of those.
        // returns undefined if no match for id was found
        const updateResult = await this.#updateDocuments({ _id: id }, objData);
        if (updateResult?.matchedCount === 0) {
            return;
        } else if (!updateResult?.acknowledged) {
            logger.warn('Update petition was not acknowledged by MongoDB');
            return;
        } else {
            return updateResult.matchedCount;
        }
    }

    async getById(id) {
        //Recibe un id y devuelve el objeto con ese id, o undefined si no está.
        const content = await this.#findDocuments({ _id: id });
        return content[0];
    }

    async findOne(condition) {
        //Recibe un id y devuelve el objeto con ese id, o null si no está.
        try {
            const content = (await this.#findDocuments(condition))[0];
            if (content) return content;
            else return null;
        } catch (err) {
            logger.error(err);
        }
    }

    async getAll() {
        //Devuelve un array con los objetos presentes en el archivo.
        return await this.#findDocuments();
    }

    async deleteById(id) {
        // Delete element with given id;
        return await this.#deleteDocument({ _id: id });
    }
}

// export default Container;
export default Container;
