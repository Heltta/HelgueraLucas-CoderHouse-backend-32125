import knex from 'knex';

const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'test',
        port : 3306,
    },
};

const myknex = knex(options)

export default myknex
