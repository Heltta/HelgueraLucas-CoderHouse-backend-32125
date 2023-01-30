import dotenv from 'dotenv';

dotenv.config();
//-- Data storage settings --//
export const DATA_STORAGE_TYPE = 
    process.env.DATA_STORAGE_TYPE ||
    'MongoDB';
export const MONGO_URL = 
    process.env.MONGO_URL ||
    (
        (process.env.MONGO_DEPLOY ||
        'mongodb+srv://SuperUser:qeeKFPY5kLCv4nMh@coderhousebackend.eu1a5zv.mongodb.net/') + 
        (process.env.MONGO_DATABASE ||
        'test')
    );



//-- Session storage settings --//
export const SESSION_SECRET =
    process.env.SESSION_SECRET ||
    'supreme cat codename';
export const SESSION_STORE_TTL =
    process.env.SESSION_STORE_TTL ||
    60 * 5; // seconds
export const SESSION_STORE_MONGOURL =
    process.env.SESSION_STORE_MONGOURL ||
    (
        (process.env.SESSION_STORE_MONGO_DEPLOY ||
        'mongodb+srv://SuperUser:qeeKFPY5kLCv4nMh@coderhousebackend.eu1a5zv.mongodb.net/') + 
        (process.env.SESSION_STORE_MONGO_DATABASE ||
        'test')
    );
export const SESSION_COOKIE_HTTPONLY =
    process.env.SESSION_COOKIE_HTTPONLY ||
    false; 
export const SESSION_COOKIE_SECURE =
    process.env.SESSION_COOKIE_SECURE ||
    false;
export const SESSION_COOKIE_MAXAGE =
    process.env.SESSION_COOKIE_MAXAGE ||
    60000; // miliseconds

//-- Server connection settings --//
export const SERVER_INTERFACE =
    process.env.SERVER_INTERFACE ||
    '127.0.0.1';
export const SERVER_PORT =
    process.env.PORT ||
    process.env.SERVER_PORT||
    8080;
