import User from "../models/user.js"
import ContainerMongo from "../controllers/containerMongoDB.js";

const userContainer = new ContainerMongo('users', User);

export {
    userContainer
}
