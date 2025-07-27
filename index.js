const DB = require('./config/config');
const mysql = require('mysql2/promise');

async function connectToDatabase() {
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

const main = async () => {
    const connection = await connectToDatabase();

    const [users] = await connection.query('SELECT * FROM users');
    console.log('Users:', users);
    const [todos] = await connection.query('SELECT * FROM todos');
    console.log('Todos:', todos);

    await connection.end();
};  

main();