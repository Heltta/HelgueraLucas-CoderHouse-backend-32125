import ContainerMariaDB from "../../controllers/containerMariaDB.js";
import UserModel from "../../models/user.js"

class UsersDaoFireBase extends ContainerMariaDB {
    constructor(){
        super('users', UserModel)
    }
}

export default UsersDaoFireBase;
