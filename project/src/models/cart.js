import { Types } from 'mongoose';

class Cart {
    constructor({ id, products, timestamp }) {
        this.id = (Types.ObjectId(id) || Types.ObjectId())?.toString();
        this.timestamp = timestamp ? new Date(timestamp) : new Date();
        products ?? (this.products = []);
        if (products instanceof Array) {
            this.products = [...products];
        } else {
            this.products = [];
        }
    }
}

// export default Container;
export default Cart;
