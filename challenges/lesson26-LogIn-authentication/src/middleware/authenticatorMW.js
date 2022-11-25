import Error from "../models/error.js";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.js"
import ContainerMongo from '../controllers/containerMongoDB.js';
import { response } from "express";

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

function isValidPassword(user, password) {
    return (user.password === password);
}

// function createHash(password) {
//   return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
// }

const userContainer = new ContainerMongo('users', User);


passport.use(
    'login', 
    new LocalStrategy(
        (username, password, done) => {
            userContainer.findOne({ userName: username })
                .then( user => {
                    if (!user) {
                        console.log('User Not Found with username ' + username);
                        return done(null, false);
                    }
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password');
                        return done(null, false);
                    }
                    return done(null, user);
                })
                .catch( (err) => done(err));
        })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      userContainer.findOne({ username: username }) 
            .then(user => {
                if (user) {
                console.log("User already exists");
                return done(null, false);
                }
                return newUser = new User({
                userName: username,
                passwordHash: password,
                email: req.body.email,
            })
            .then( newUser =>
                userContainer.save(newUser) 
                    .then( userWithId => {
                            console.log(user);
                            console.log("User Registration succesful");
                            return done(null, userWithId);
                        })
                    .catch(err => {
                        console.log("Error in Saving user: " + err);
                        return done(err)
                    })
            )
            .catch( err => {
                console.log("Error in SignUp: " + err);
                return done(err);
            });

            
        });
    }
  )
);

export {
    authAdmin,
    checkUserLogged,
    logInNeeded,
};
