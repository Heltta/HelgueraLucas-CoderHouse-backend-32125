import ProductsDaoMariaDB from "./products/productsDaoMariaDB.js";
import ProductsDaoMongoDB from "./products/productsDaoMongoDB.js"
import ProductsDaoFireBase from "./products/productsDaoFireBase.js"
import ProductsDaoFileSystem from "./products/productsDaoFileSystem.js"

import { DATA_STORAGE_TYPE as storageType } from "../config/dotEnVar.js";

let BaseClass;

if(storageType === 'MariaDB'){
    BaseClass = ProductsDaoMariaDB;
}
else if(storageType === 'MongoDB'){
    BaseClass = ProductsDaoMongoDB;
}
else if(storageType === 'FireBase'){
    BaseClass = ProductsDaoFireBase;
}
else if(storageType === 'FileSystem'){
    BaseClass = ProductsDaoFileSystem;
}

class ProductsGeneralDao extends BaseClass{
    constructor(){
        super();
    }
}

export default ProductsGeneralDao
