const { DB_USER } = require('../config/config');
const { connectToDB } = require('../models');

class CategoriesModel {

    async getCategories(){
        const connection = await connectToDB();
        const [categories] = await connection.query('SELECT * FROM categories');
        
        await connection.end();
        return categories;
    }

    async getCategoriesById(id){
        const connection = await connectToDB();
        const [categories] = await connection.query(`SELECT * FROM categories WHERE id = ${id}`);

        await connection.end();
        return categories;
    }

    async createCategory(categoryData){
        const { category_name } = categoryData;

        const connection = await connectToDB();

        const [result] = await connection.query(`
            INSERT INTO 
                categories (category_name)
            VALUES (?)`, 
            [category_name])

            await connection.end();

            return result;
    }

}

module.exports = new CategoriesModel();