import ContainerMongoDB from '../../controllers/containerMongoDB.js';
import ProductModel from '../../models/cart.js';
import logger from '../../config/logger.js';
import Product from '../../models/product.js';

class CartsDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super('carts', ProductModel);
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
}

export default CartsDaoMongoDB;
