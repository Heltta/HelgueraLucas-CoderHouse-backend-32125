import ContainerFS from "../../controllers/containerFileSystem.js";

class UsersDaoFileSystem extends ContainerFS {
    constructor(){
        super('data/users.json')
    }
}

export default UsersDaoFileSystem;
