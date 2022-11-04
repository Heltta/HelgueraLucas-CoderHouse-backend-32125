import ContainerFS from "../../controllers/containerFileSystem.js";

class ProductsDaoMariaDB extends ContainerFS {
    constructor(){
        super('data/carts.json')
    }
}

export default ProductsDaoMariaDB;
