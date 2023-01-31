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
        homeAddres,
        age,
        phone,
        password
    }) {
        if(!(
           email &&
           firstName &&
           lastName &&
           age &&
           phone &&
           password )
        ){
            throw new Error(`Some parameter of User contructor is falsy`)
        }
        this.id = id || Types.ObjectId();
        this.email = email || "";
        this.firstName = firstName || "";
        this.lastName = lastName || "";
        this.homeAddres = homeAddres || "";
        this.age = age || "";
        this.password = password || "";
        this.phone = phone || "";
        this.privilegesCategory = "user";
        this.photo = "";
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
        email: String,
        firstName: String,
        lastName: String,
        age: Number,
        password: String,
        phone: String,
        privilegesCategory: String,
        photo: String,
    })

}

export default User;
