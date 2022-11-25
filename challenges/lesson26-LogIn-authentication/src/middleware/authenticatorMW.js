import Error from "../models/error.js";
import User from "../models/user.js"
import ContainerMongo from '../controllers/containerMongoDB.js';

function authAdmin(req, res, next){
    if(
        req.session?.user === 'pepe@gmail.com' &&
        req.session?.admin
    ){
        return next();
    }
    return res.status(401).send(new Error({
        code: 401,
        description: 'Admin authentication error'
    }))
}

function checkUserLogged(req, res, next){
    if(
        req.session?.user
    ){
        return res.redirect('/home')
    }
    return next();
}

function logInNeeded(req, res, next){
    if(
        req.session?.user
    ){
        return next()
    }
    return res.redirect('/');
}

const userContainer = new ContainerMongo('users', User);
export {
    authAdmin,
    checkUserLogged,
    logInNeeded,
};
