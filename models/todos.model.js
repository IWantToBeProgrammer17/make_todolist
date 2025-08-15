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
        const { title, description, is_completed, user_id, category_id } = todoData;
        const connection = await connectToDB();

        const [result] = await connection.query(`
            INSERT INTO 
                todos (title, description, is_completed, user_id, category_id)
            VALUES (?, ?, ?, ?, ?)`, 
            [title, description, is_completed, user_id, category_id]);
        await connection.end();

        return result;
    }
}
module.exports = new TodosModel();