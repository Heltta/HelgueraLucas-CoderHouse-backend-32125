import { 
    Schema,
    Types
} from 'mongoose';

/**
 * Representation any App's user. 
 */
class User {
    constructor({
        id,
        email,
        firstName,
        lastName,
        age,
        phone,
        password
    }) {
        if(!(
           id &&
           email &&
           firstName &&
           lastName &&
           age &&
           phone &&
           password )
        ){
            throw new Error('Some parameter of User contructor is nullish')
        }
        this.id = id;
        this.email = email || "";
        this.firstName = firstName || "";
        this.lastName = lastName || "";
        this.age = age || "";
        this.password = password || "";
        this.phone = phone || "";
        this.privilegesCategory = "user";
    }

    get fullName(){
        return (
            this.firstName +
            ' ' +
            this.lastName
        )
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
