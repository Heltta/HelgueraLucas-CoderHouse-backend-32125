import ProductsDaoMariaDB from "./products/productsDaoMariaDB.js";
import ProductsDaoMongoDB from "./products/productsDaoMongoDB.js"
import ProductsDaoFireBase from "./products/productsDaoFireBase.js"
import ProductsDaoFileSystem from "./products/productsDaoFileSystem.js"

const dataBase = 'MariaDB'; // placeholder until Environment Variables implementation
let BaseClass;

if(dataBase === 'MariaDB'){
    BaseClass = ProductsDaoMariaDB;
}
else if(dataBase === 'MongoDB'){
    BaseClass = ProductsDaoMongoDB;
}
else if(dataBase === 'FireBase'){
    BaseClass = ProductsDaoFireBase;
}
else if(dataBase === 'FileSystem'){
    BaseClass = ProductsDaoFileSystem;
}

class ProductsGeneralDao extends BaseClass{
    constructor(){
        super();
    }
}

export default ProductsGeneralDao
