import dotenv from 'dotenv'

dotenv.config();

export const DATA_STORAGE_TYPE = process.env.DATA_STORAGE_TYPE || 'MariaDB';
export const SERVER_PORT = process.env.SERVER_PORT || 8080;
