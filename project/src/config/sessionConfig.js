import session from 'express-session';
import MongoStore from 'connect-mongo';

//////////// CLI Args & dotENV ////////
import {
    SESSION_SECRET,
    SESSION_STORE_TTL,
    SESSION_STORE_MONGOURL,
    SESSION_COOKIE_HTTPONLY,
    SESSION_COOKIE_SECURE,
    SESSION_COOKIE_MAXAGE,
    ENVIRONMENT,
} from './dotEnVar.js';

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const sessionConfig = {
    secret: SESSION_SECRET,
    cookie: {
        httpOnly: SESSION_COOKIE_HTTPONLY,
        secure: SESSION_COOKIE_SECURE,
        maxAge: SESSION_COOKIE_MAXAGE,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
};

if (ENVIRONMENT !== 'test') {
    sessionConfig.store = MongoStore.create({
        mongoUrl: SESSION_STORE_MONGOURL,
        mongoOptions: advancedOptions,
        ttl: SESSION_STORE_TTL,
    });
}

const expressSession = session(sessionConfig);

export { sessionConfig, expressSession };
