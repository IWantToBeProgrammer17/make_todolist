const { DB_USER } = require('../config/config');
const { connectToDB } = require('../models');


class UsersModel {

    async getUsers() {
        const connection = await connectToDB();
        const [users] = await connection.query('SELECT * FROM users');

        await connection.end();
        return users;
    }

    async getUserById(id) {
        const connection = await connectToDB();
        const [users] = await connection.query(`SELECT * FROM users WHERE id = ${id}`);
        
        await connection.end();
        return users;
    }

    async createUser(userData){
        const {name, nickname, email, password} = userData;

        const connection = await connectToDB();

        const [result] = await connection.query(`
            INSERT INTO 
                users (name, nickname, email, password)
            VALUES (?, ?, ?, ?)`, 
            [name, nickname, email, password])

            await connection.end();

            return result;
        } 
    async updateUser(id, userData){
        const connection = await connectToDB();
        if(userData.id){
            delete userData.id;
        }

        let updateString = '';
        const values = [];

        Object.keys(userData).forEach(key => {
            updateString += `${key} = ?,`;
            values.push(userData[key]);
        })

        updateString = updateString.slice(0, -1);
        values.push(id);
        const [result] = await connection.query(`UPDATE users SET ${updateString} WHERE id = ?`, values);

        return result;
        
    }
    async deleteUser(id){
        const connection = await connectToDB();
        
        const [result] = await connection.query(`DELETE FROM users WHERE id = ?`, [id])
 
        await connection.end();
 
        return result;
    }
}

module.exports = new UsersModel();