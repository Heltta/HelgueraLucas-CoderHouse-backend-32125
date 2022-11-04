import CartsDaoMariaDB from "./carts/cartsDaoMariaDB.js";
import CartsDaoMongoDB from "./carts/cartsDaoMongoDB.js"
import CartsDaoFireBase from "./carts/cartsDaoFireBase.js"
import CartsDaoFileSystem from "./carts/cartsDaoFileSystem.js"

const dataBase = 'FileSystem'; // placeholder until Environment Variables implementation
let BaseClass;

if(dataBase === 'MariaDB'){
    BaseClass = CartsDaoMariaDB;
}
else if(dataBase === 'MongoDB'){
    BaseClass = CartsDaoMongoDB;
}
else if(dataBase === 'FireBase'){
    BaseClass = CartsDaoFireBase;
}
else if(dataBase === 'FileSystem'){
    BaseClass = CartsDaoFileSystem;
}

class CartsGeneralDao extends BaseClass{
    constructor(){
        super();
    }
}

export default CartsGeneralDao