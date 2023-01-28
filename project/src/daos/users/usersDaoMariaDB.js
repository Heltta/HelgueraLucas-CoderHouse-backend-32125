import ContainerMariaDB from "../../controllers/containerMariaDB.js";
import UserModel from "../../models/user.js"

class UsersDaoMariaDB extends ContainerMariaDB {
    constructor(){
        super('users', UserModel)
    }
}

export default UsersDaoMariaDB;
