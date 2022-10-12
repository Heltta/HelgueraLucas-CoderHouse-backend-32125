
class Cart {
    constructor(id, products){
        this.id = id || "";
        this.timestamp = Date.now();
        this.products = [...products] || [];
    }
}

// export default Container;
module.exports = Cart;
