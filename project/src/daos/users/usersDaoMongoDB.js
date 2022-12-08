import ContainerMongoDB from "../../controllers/containerMongoDB.js";
import ProductModel from "../../models/product.js"

class UsersDaoMongoDB extends ContainerMongoDB {
    constructor(){
        super('users', ProductModel)
    }
}

export default UsersDaoMongoDB;
