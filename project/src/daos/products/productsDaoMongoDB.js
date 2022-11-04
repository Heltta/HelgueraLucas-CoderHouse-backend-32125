import ContainerMariaDB from "../../controllers/containerMariaDB.js";
import ProductModel from "../../models/product.js"

class ProductsDaoMongoDB extends ContainerMariaDB {
    constructor(){
        super('products', ProductModel)
    }
}

export default ProductsDaoMongoDB;
