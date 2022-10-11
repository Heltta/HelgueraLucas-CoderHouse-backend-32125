
class Product {
    constructor(id, name, description, code, photoURL, price, stock){
        this.id = id;
        this.timestamp = Date.now();
        this.name = name;
        this.description = description;
        this.code = code;
        this.photo = photoURL;
        this.price = price;
        this.stock = stock;
    }
}

// export default Container;
module.exports = Product;
