import ContainerMariaDB from "../../controllers/containerMariaDB.js";
import ProductModel from "../../models/product.js"

class UsersDaoMariaDB extends ContainerMariaDB {
    constructor(){
        super('users', ProductModel)
    }
}

export default UsersDaoMariaDB;
