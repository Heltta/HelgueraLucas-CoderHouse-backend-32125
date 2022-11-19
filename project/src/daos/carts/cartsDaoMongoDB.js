import ContainerMongoDB from "../../controllers/containerMongoDB.js";
import ProductModel from "../../models/cart.js"

class CartsDaoMongoDB extends ContainerMongoDB {
    constructor(){
        super('carts', ProductModel)
    }
}

export default CartsDaoMongoDB;
