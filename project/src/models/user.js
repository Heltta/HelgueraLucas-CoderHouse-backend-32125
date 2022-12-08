import { 
    Schema,
    Types
} from 'mongoose';

class User {
    constructor({id, userName, email, passwordHash, privilegesCategory}){
        this.id = id || "";
        this.userName = userName || "";
        this.email = email || "";
        this.passwordHash = passwordHash || "";
        this.privilegesCategory = privilegesCategory || "user";
    }

    static mongoSchema = () => new Schema({
        id: Types.ObjectId,
        userName: String,
        email: String,
        passwordHash: String,
        photo: String,
        privilegesCategory: String,
    })

}

export default User;
