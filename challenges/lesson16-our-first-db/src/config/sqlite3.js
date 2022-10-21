import knex from 'knex';

const options = {
    client: 'sqlite3',
    connection: {
        filename: './data/mydb.sqlite'
    }
};

const myknex = knex(options)

export default myknex
