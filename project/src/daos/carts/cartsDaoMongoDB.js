import ContainerFS from "../../controllers/containerFileSystem.js";

class ProductsDaoMongoDB extends ContainerFS {
    constructor(){
        super('data/carts.json')
    }
}

export default ProductsDaoMongoDB;
