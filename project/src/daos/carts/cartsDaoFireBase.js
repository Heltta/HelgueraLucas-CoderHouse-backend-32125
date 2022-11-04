import ContainerFS from "../../controllers/containerFileSystem.js";

class ProductsDaoFireBase extends ContainerFS {
    constructor(){
        super('data/carts.json')
    }
}

export default ProductsDaoFireBase;
