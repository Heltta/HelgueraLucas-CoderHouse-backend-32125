import { 
    Types,
    Schema,
} from "mongoose";

class Message {
    constructor({email, name, surname, age, alias, avatar, text}){
        this.author = {
            id: email || "",
            name: name || "",
            surname: surname || "",
            age: age || null,
            alias: alias || "",
            avatar: avatar || "",
        };
        this.text = text || "";
    }

    static authorSchema = () => 
        new Schema({
            id: String,
            name: String,
            surname: String,
            age: Number,
            alias: String,
            avatar: String,
    });

    static mongoSchema = () => 
        new Schema({
            id: Types.ObjectId,
            author: { type: this.authorSchema(), default: {} },
            text: String,
    });
    
}

export default Message;
