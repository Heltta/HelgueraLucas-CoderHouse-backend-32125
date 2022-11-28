import passport from 'passport';
import bcrypt from 'bcrypt';
import passportLocal from 'passport-local';
import { userContainer } from './manageUsers.js';

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
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
        new LocalStrategy(
            signUp
        )
    )
);

export default passport;
