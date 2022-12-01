import bcrypt from 'bcrypt';
import { userContainer } from './manageUsers.js';
/////////// Authentication methods ////////////

const isValidPassword = (user, password) => {
    return (password === user.passwordHash)
    // return bcrypt.compareSync(password, user.password)
}

function createHash(password) {
    return bcrypt.hashSync(
                password,
                bcrypt.genSaltSync(10),
                null
            );  
}

function logIn(userName, password, done) {
    userContainer.findOne({ userName: userName })
        .then( user => {
            if (!user) {
                console.log('User Not Found with username ' + userName);
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false);
            }
            return done(null, user);
        })
        .catch( (err) => done(err));
}

function signUp (req, res, next) {
    console.log('entré a signUp de passport');
    return next();

        // .catch( err => {
        //     console.log("Error in SignUp: " + err);
        //     return done(err);
        // });
}

/////////// Create stategies ////////////

import passport from 'passport';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy

passport.use(
    "login",
    new LocalStrategy(
        logIn
    )
);

passport.use(
    "signup-local",
    new LocalStrategy(
        {
            passReqToCallback: true
        },
        signUp
    )
);

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.userName,
      });
    });
  });
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

export default passport;
