const mysql = require('mysql2');
require('dotenv').config();

const { env } = require('node:process');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'item_shop',
    password: env.SQL_PASSWD,
});

module.exports = pool.promise();
