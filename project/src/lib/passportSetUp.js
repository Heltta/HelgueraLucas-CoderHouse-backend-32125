import bcrypt from 'bcrypt';
import { userContainer } from './manageUsers.js';
import User from '../models/user.js';
import logger from '../config/logger.js';


/////////// Authentication helpers ////////////

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.passwordHash);
}

function createHash(password) {
    return bcrypt.hashSync(
                password,
                bcrypt.genSaltSync(10),
                null
            );  
}

/////////// Authentication methods ////////////

function logIn(userEmail, passwordHash, done) {
    userContainer.findOne({ email: userEmail })
        .then( user => {
            if (!user) {
                logger.info('User Not Found with username ' + userEmail);
                return done(null, false);
            }
            if (!isValidPassword(user, passwordHash)) {
                logger.info('Invalid Password');
                return done(null, false);
            }
            return done(null, user);
        })
        .catch( (err) => done(err));
}

async function signUp (req, userEmail, password, done) {
    try{
        const existingUser = await userContainer.findOne({ email: userEmail });
        if(existingUser){
            // User is already registered
            // Then, error is null and user is false
            logger.error('Error, user already exists');
            req.flash('error', `User already exists`);
            return done(null, false);
        }

        // User is not registered
        // Then, create a new one and save at DB
        const newUser = new User({
            userName: req.body.userName,
            email: userEmail,
            passwordHash: createHash(password),
        });

        try{
            await userContainer.save(newUser);
            logger.info(newUser);
            logger.info('New user registration successful');
            return done(null, newUser);
        }
        catch(err){
            logger.error(`Error in saving user: ${err}`);
            req.flash('error', `Error in saving user: ${err}`);
            return done(err);
        }
    }
    catch(err) {
        logger.error(`Error in signUp: ${err}`);
        req.flash('error', `Error in signUp: ${err}`);
        return done(err);
    }
}

/////////// Create stategies ////////////

import passport from 'passport';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'passwordHash'
        },
        logIn
    )
);

passport.use(
    "signup-local",
    new LocalStrategy(
        {
            usernameField: 'inputEmail',
            passwordField: 'inputPassword',
            passReqToCallback: true,
        },
        signUp
    )
);

/////////// User serialization //////////

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
