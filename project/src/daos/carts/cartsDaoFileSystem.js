import ContainerFS from "../../controllers/containerFileSystem.js";

class ProductsDaoFileSystem extends ContainerFS {
    constructor(){
        super('data/carts.json')
    }
}

export default ProductsDaoFileSystem;
