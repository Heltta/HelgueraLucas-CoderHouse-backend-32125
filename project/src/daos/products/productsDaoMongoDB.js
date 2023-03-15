import ContainerMongoDB from '../../controllers/containerMongoDB.js';
import ProductModel from '../../models/product.js';
import { Schema, Types } from 'mongoose';

class ProductsDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super('products', ProductModel);
    }

    /**
     * Creates schema for MongoDB
     *
     * @returns Schema
     */
    static mongoSchema() {
        return new Schema({
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
}

export default ProductsDaoMongoDB;
