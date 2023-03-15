import ContainerMongoDB from '../../controllers/containerMongoDB.js';
import ProductsDaoMongoDB from '../products/productsDaoMongoDB.js';
import logger from '../../config/logger.js';
import Product from '../../models/product.js';
import { Schema, Types } from 'mongoose';

class CartsDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super('carts');
    }

    async save(rawCart) {
        try {
            const parsedProducts = rawCart?.products.map((rawProduct) => {
                const { id, ...objData } = rawProduct;
                return { _id: id, ...objData };
            });
            const parsedCart = { ...rawCart, products: parsedProducts };
            return await super.save(parsedCart);
        } catch (error) {
            logger.error(error);
        }
    }

    async getById(id) {
        try {
            const rawCart = await super.getById(id);
            const parsedProducts = rawCart?.products.map((rawProduct) => {
                const { _id, ...objData } = rawProduct._doc;
                return new Product({ id: _id, ...objData });
            });
            const parsedCart = { ...rawCart, products: parsedProducts };
            return parsedCart;
        } catch (error) {
            logger.error(error);
        }
    }

    static mongoSchema() {
        const ProdSchema = ProductsDaoMongoDB.mongoSchema();
        return new Schema({
            id: Types.ObjectId,
            timestamp: { type: Date, default: Date.now },
            products: [ProdSchema],
        });
    }
}

export default CartsDaoMongoDB;
