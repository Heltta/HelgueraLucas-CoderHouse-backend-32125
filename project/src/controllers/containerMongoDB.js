import { model } from 'mongoose';
import logger from '../config/logger.js';
import MongoDatabaseClient from './client/mongoDatabaseClient.js';

class Container {
    constructor(collectionName) {
        this.coll = collectionName;
        this.constructor.client.connectDB();
        this.model = model(collectionName, this.constructor.mongoSchema());
    }

    static client = MongoDatabaseClient;

    static connectDB() {
        this.client.connectDB();
    }

    static disconnectDB() {
        this.client.disconnectDB();
    }

    static mongoSchema() {
        throw new Error('Operation "mongoSchema" is not implemented');
    }

    /**
     * Find all documents in a collection that met a condition
     *
     * If not condition is passed, then return all docs inside the collection.
     * if no doc is found, return null.
     *
     * @param {*} objCondition
     * @returns {Array | null}
     */
    async #findDocuments(objCondition = {}) {
        // Seach all docs from container collection stored at DB that pass a condition.
        // If not condition is passed, then return all docs inside the collection.
        // if no doc is found, return null.
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
        // eslint-disable-next-line no-unused-vars
        const { _id, __v, ...objData } = content[0];
        return { id: _id, ...objData };
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
