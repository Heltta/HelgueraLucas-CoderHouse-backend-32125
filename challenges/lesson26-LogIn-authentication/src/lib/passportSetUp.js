import passport from 'passport';
import { LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { userContainer } from './manageUsers.js';

import {
    logInAuthenticate,
    signUpAuthenticate,
} from '../middleware/authenticatorMW.js'


function createHash(password) {
    return bcrypt.hashSync(
                password,
                bcrypt.genSaltSync(10),
                null
            );  
}

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

passport.use(
    "signup-local",
    new LocalStrategy(
        {
        passReqToCallback: true
        },
        new LocalStrategy(
            signUpAuthenticate
        )
    )
);
    
passport.use(
    "login",
    new LocalStrategy(
        logInAuthenticate
    )
);
export default passport;
