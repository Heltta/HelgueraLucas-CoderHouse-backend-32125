import { Schema, Types } from 'mongoose';
import Product from './product.js';

class Cart {
    constructor({ id, products }) {
        this.id = (Types.ObjectId(id) || Types.ObjectId())?.toString();
        this.timestamp = Date.now();
        products ?? (this.products = []);
        if (products instanceof Array) {
            this.products = [...products];
        } else {
            this.products = [];
        }
    }

    static mongoSchema = () => {
        const ProdSchema = Product.mongoSchema();
        return new Schema({
            id: Types.ObjectId,
            timestamp: { type: Date, default: Date.now },
            products: [ProdSchema],
        });
    };
}

// export default Container;
export default Cart;
