import myknex from '../config/mariaDB.js';

class Message {
    constructor(socketid, content, userEmail, date){
        this.socketId= socketid || "",
        this.content= content || "",
        this.user= userEmail || "",
        this.date= date ||  Date.now()
    }

    static tableFields = [
        {key:'id', type: 'increments'},
        {key: 'socketId', type: 'string'},
        {key: 'content', type: 'text'},
        {key: 'user', type: 'string'},
        {key: 'date', type: 'unsigned biginteger'}
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
                    table.string('user');
                    table.text('content');
                    table.string('socketId');
                    table.bigint('date').unsigned();
                })
                    .then(  _ => console.log("table created"))
                    .catch( (err) => {console.log(err); throw err});

            }
        })
    } 
}

export default Message;
