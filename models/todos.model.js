const { DB_USER } = require('../config/config');
const { connectToDB } = require('../models');

class TodosModel {

    async getTodos() {
        const connection = await connectToDB();
        const [todos] = await connection.query('SELECT * FROM todos');  

        await connection.end();
        return todos;
    }   
    async getTodoById(id) {
        const connection = await connectToDB();
        const [todos] = await connection.query(`SELECT * FROM todos WHERE id = ${id}`);

        await connection.end();
        return todos;
    }   
    async createTodo(todoData) {
        const { title, description, is_completed, user_id, category_id, due_date} = todoData;
        const connection = await connectToDB();

        const [result] = await connection.query(`
            INSERT INTO 
                todos (title, description, is_completed, user_id, category_id, due_date)
            VALUES (?, ?, ?, ?, ?, ?)`, 

            [title, description, is_completed, user_id, category_id, due_date])

            await connection.end();

            return result;   
    }
    async updateTodo(id, todoData){
        const connection = await connectToDB();
        if(todoData.id){
            delete todoData.id;
        }

        let updateString = '';
        const values = [];

        Object.keys(todoData).forEach(key => {
            updateString += `${key} = ?,`;
            values.push(todoData[key]);
        })

        updateString = updateString.slice(0, -1);
        values.push(id);
        const [result] = await connection.query(`UPDATE todos SET ${updateString} WHERE id = ?`, values);

        return result;
        
    }
    async deleteTodo(id){
        const connection = await connectToDB();
        
        const [result] = await connection.query(`DELETE FROM todos WHERE id = ?`, [id])
 
        await connection.end();
 
        return result;
    }
}
module.exports = new TodosModel();