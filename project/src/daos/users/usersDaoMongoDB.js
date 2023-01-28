import ContainerMongoDB from "../../controllers/containerMongoDB.js";
import UserModel from "../../models/user.js"

class UsersDaoMongoDB extends ContainerMongoDB {
    constructor(){
        super('users', UserModel)
    }
}

export default UsersDaoMongoDB;
