import myknex from '../config/mariaDB.js';
import { 
    Schema,
    Types
} from 'mongoose';

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
        {key: 'photo', type:'string'},
        {key: 'price', type: 'integer'},
        {key: 'stock', type: 'integer'}
    ]

    static #dataBase = myknex;

    static createTable(tableName){
        this.#dataBase.schema.hasTable(tableName).then( exists =>{
            if(exists){
                console.log("table already exists");
            }
            else{
                this.#dataBase.schema.createTable(tableName, table => {
                    table.increments('id');
                    table.bigint('timestamp').unsigned();
                    table.string('name');
                    table.text('description');
                    table.string('code');
                    table.string('photo');
                    table.integer('price');
                    table.integer('stock');
                })
                    .then(  _ => console.log("table created"))
                    .catch( (err) => {console.log(err); throw err});

            }
        })
    }  

    static mongoSchema = () => new Schema({
        id: Types.ObjectId,
        timestamp: { type: Date, default: Date.now },
        name:   String,
        description: String,
        code:   String,
        photo:  String,
        price:  Number,
        stock:  Number,
    })
}

// export default Container;
export default Product;
