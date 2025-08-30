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
    async updateCategory(id, categoryData){
        const connection = await connectToDB();
        if(categoryData.id){
            delete categoryData.id;
        }
    
        let updateString = '';
        const values = [];
    
        Object.keys(categoryData).forEach(key => {
            updateString += `${key} = ?,`;
            values.push(categoryData[key]);
        })
    
        updateString = updateString.slice(0, -1);
        values.push(id);
        const [result] = await connection.query(`UPDATE categories SET ${updateString} WHERE id = ?`, values);
    
        return result;
            
    }
    async deleteCategory(id){
        const connection = await connectToDB();
            
        const [result] = await connection.query(`DELETE FROM categories WHERE id = ?`, [id])
     
        await connection.end();
 
        return result;
    }

}

module.exports = new CategoriesModel();