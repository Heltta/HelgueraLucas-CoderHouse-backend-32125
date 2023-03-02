import myknex from '../config/mariaDB.js';
import { Schema, Types } from 'mongoose';
import logger from '../config/logger.js';

class Product {
    constructor({ id, name, description, code, photo, price, stock }) {
        this.id = (Types.ObjectId(id) || Types.ObjectId())?.toString();
        this.timestamp = new Date();
        this.name = name || '';
        this.description = description || '';
        this.code = code || '';
        this.photo = photo || '';
        this.price = price || '';
        this.stock = stock || '';
    }

    /**
     * MySQL database for products
     */
    static #dataBase = myknex;

    /**
     * Create Table for an SQL database
     *
     * @param {String} tableName
     */
    static createTable(tableName) {
        this.#dataBase.schema.hasTable(tableName).then((exists) => {
            if (exists) {
                logger.warn('table already exists');
            } else {
                this.#dataBase.schema
                    .createTable(tableName, (table) => {
                        table.increments('id');
                        table.bigint('timestamp').unsigned();
                        table.string('name');
                        table.text('description');
                        table.string('code');
                        table.string('photo');
                        table.integer('price');
                        table.integer('stock');
                    })
                    .then((_) => logger.info('table created'))
                    .catch((err) => {
                        logger.error(err);
                        throw err;
                    });
            }
        });
    }

    /**
     * Creates schema for MongoDB
     *
     * @returns Schema
     */
    static mongoSchema = () =>
        new Schema({
            id: Types.ObjectId,
            timestamp: { type: Date, default: Date.now },
            name: String,
            description: String,
            code: String,
            photo: String,
            price: Number,
            stock: Number,
        });
}

// export default Container;
export default Product;
