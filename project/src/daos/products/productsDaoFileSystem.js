import ContainerFS from "../../controllers/containerFileSystem.js";

class ProductsDaoFileSystem extends ContainerFS {
    constructor(){
        super('data/products.json')
    }
}

export default ProductsDaoFileSystem;
