import { 
    Schema,
    Types
} from 'mongoose';
import Product from './product.js';

class Cart {
    constructor({id, products}){
        this.id = id || "";
        this.timestamp = Date.now();
        this.products = [...products] || [];
    }
    

    static mongoSchema = () => {
        const ProdSchema = Product.mongoSchema();
        return new Schema({
            id: Types.ObjectId,
            timestamp: { type: Date, default: Date.now },
            products:   [ProdSchema],
    })}
}

// export default Container;
export default Cart;
