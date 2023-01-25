import UsersDaoMariaDB from "./users/usersDaoMariaDB.js";
import UsersDaoMongoDB from "./users/usersDaoMongoDB.js"
import UsersDaoFireBase from "./users/usersDaoFireBase.js"
import UsersDaoFileSystem from "./users/usersDaoFileSystem.js"

import { DATA_STORAGE_TYPE as storageType } from "../config/dotEnVar.js";

let BaseClass;

if(storageType === 'MariaDB'){
    BaseClass = UsersDaoMariaDB;
}
else if(storageType === 'MongoDB'){
    BaseClass = UsersDaoMongoDB;
}
else if(storageType === 'FireBase'){
    BaseClass = UsersDaoFireBase;
}
else if(storageType === 'FileSystem'){
    BaseClass = UsersDaoFileSystem;
}

let instance = null; //needed for a singleton class

class UsersGeneralDao extends BaseClass{
    constructor(){
        super();
    }
	static getInstance(){
		if(!instance){
			instance = new UsersGeneralDao()
		}
		return instance
	}
}

export default UsersGeneralDao
