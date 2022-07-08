'use strict';

const dotenv = require('dotenv');
dotenv.config();

const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 25,
    dateStrings: 'date',
    supportBigNumbers: true
};

module.exports = options;