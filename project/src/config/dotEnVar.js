import dotenv from 'dotenv';

dotenv.config();

export const DATA_STORAGE_TYPE = process.env.DATA_STORAGE_TYPE || 'MongoDB';
export const SESSION_SECRET = process.env.SESSION_SECRET || 'supreme cat codename';
export const SESSION_STORE_TTL = process.env.SESSION_STORE_TTL || 60 * 5; // seconds
export const SESSION_STORE_MONGOURL = process.env.SESSION_STORE_MONGOURL ||'mongodb://localhost/test';
export const SESSION_COOKIE_HTTPONLY = process.env.SESSION_COOKIE_HTTPONLY || false; // miliseconds
export const SESSION_COOKIE_SECURE = process.env.SESSION_COOKIE_SECURE || false; // miliseconds
export const SESSION_COOKIE_MAXAGE = process.env.SESSION_COOKIE_MAXAGE || 60000; // miliseconds
export const SERVER_PORT = process.env.SERVER_PORT || 8080;
