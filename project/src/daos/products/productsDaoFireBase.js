import ContainerMariaDB from "../../controllers/containerMariaDB.js";
import ProductModel from "../../models/product.js"

class ProductsDaoFireBase extends ContainerMariaDB {
    constructor(){
        super('products', ProductModel)
    }
}

export default ProductsDaoFireBase;
