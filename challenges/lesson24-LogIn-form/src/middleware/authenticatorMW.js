import Error from "../models/error.js";

function authAdmin(req, res, next){
    if(
        req.session?.user === 'pepe' &&
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

export {
    authAdmin,
    checkUserLogged,
    logInNeeded,
};
