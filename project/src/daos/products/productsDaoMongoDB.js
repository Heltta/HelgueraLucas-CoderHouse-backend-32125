import ContainerMongoDB from "../../controllers/containerMongoDB.js";
import ProductModel from "../../models/product.js"

class ProductsDaoMongoDB extends ContainerMongoDB {
    constructor(){
        super('products', ProductModel)
    }
}

export default ProductsDaoMongoDB;
