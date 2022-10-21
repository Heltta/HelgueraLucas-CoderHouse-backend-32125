
class Product {
    constructor({id, name, description, code, photoURL, price, stock}){
        this.id = id || "";
        this.timestamp = Date.now();
        this.name = name  || "";
        this.description = description  || "";
        this.code = code  || "";
        this.photo = photoURL  || "";
        this.price = price  || "";
        this.stock = stock  || "";
    }
    static tableFields = [
        {key:'id', type: 'increments'},
        {key: 'timestamp', type: 'unsigned biginteger'},
        {key: 'name', type: 'string'},
        {key: 'description', type: 'text'},
        {key: 'code', type: 'string'},
        {key: 'photoURL', type:'string'},
        {key: 'price', type: 'integer'},
        {key: 'stock', type: 'integer'}
    ]
}

// export default Container;
export default Product;
