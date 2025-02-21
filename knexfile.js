require('dotenv').config();

module.exports = {
    development: {
        client: process.env.DB_CONNECTION,
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: './src/db/migrations',
        },
        seeds: {
            directory: './src/db/seeds',
        },
    },

    test: {
        client: process.env.DB_CONNECTION,
        connection: {
            host: process.env.DB_TEST_HOST,
            port: process.env.DB_TEST_PORT,
            user: process.env.DB_TEST_USER,
            password: process.env.DB_TEST_PASSWORD,
            database: process.env.DB_TEST_NAME,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/db/migrations',
        },
        seeds: {
            directory: './src/db/seeds',
        },
    }
};