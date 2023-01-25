import CartsDaoMariaDB from "./carts/cartsDaoMariaDB.js";
import CartsDaoMongoDB from "./carts/cartsDaoMongoDB.js"
import CartsDaoFireBase from "./carts/cartsDaoFireBase.js"
import CartsDaoFileSystem from "./carts/cartsDaoFileSystem.js"

import { DATA_STORAGE_TYPE as storageType } from "../config/dotEnVar.js";

let BaseClass;

if(storageType === 'MariaDB'){
    BaseClass = CartsDaoMariaDB;
}
else if(storageType === 'MongoDB'){
    BaseClass = CartsDaoMongoDB;
}
else if(storageType === 'FireBase'){
    BaseClass = CartsDaoFireBase;
}
else if(storageType === 'FileSystem'){
    BaseClass = CartsDaoFileSystem;
}

let instance = null; //needed for a singleton class

class CartsGeneralDao extends BaseClass{
    constructor(){
        super();
    }
	static getInstance(){
		if(!instance){
			instance = new CartsGeneralDao()
		}
		return instance
	}
}

export default CartsGeneralDao
