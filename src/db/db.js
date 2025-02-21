// src/db/database.js
const knex = require('knex');
require('dotenv').config();

const db = knex({
    client: 'mysql2',
    connection: {
        host: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_HOST : process.env.DB_HOST,
        port: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_PORT : process.env.DB_PORT,
        user: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_USER : process.env.DB_USER,
        password: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_PASSWORD : process.env.DB_PASSWORD,
        database: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_NAME : process.env.DB_NAME,
    },
});

module.exports = db;