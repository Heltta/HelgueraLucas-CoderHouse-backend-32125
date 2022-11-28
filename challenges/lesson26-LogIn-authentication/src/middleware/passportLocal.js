import { userContainer } from '../lib/manageUsers.js'

function isValidPassword(user, password) {
    return (user.password === password);
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

export {
    logIn as logInAuthenticate,
    signUp as signUpAuthenticate,
}
