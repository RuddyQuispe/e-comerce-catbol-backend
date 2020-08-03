const {Pool} = require('pg');

/**
 * Generate connection with PostgreSQL to database
 */
const pool = new Pool({
    host: process.env.PSQL_HOST,
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWD,
    database: process.env.PSQL_DATABASE,
    port: process.env.PSQL_PORT
});

pool.connect();
console.log('Connected to database');

module.exports = pool;