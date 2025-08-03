const DB = require('../config/config');
const mysql = require('mysql2/promise');

async function connectToDB() {
    try {
        const connection = await mysql.createConnection({
            host: DB.DB_HOST,
            port: DB.DB_PORT,
            user: DB.DB_USER,
            password: DB.DB_PASSWORD,
            database: DB.DB_NAME
        });
        console.log('Connected to the database successfully!');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

module.exports = {connectToDB};