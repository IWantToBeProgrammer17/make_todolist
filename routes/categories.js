const express = require('express');
const CategoriesModel = require('../models/category.model');
const categoryModel = require('../models/category.model');
const router = express.Router();

router.get('/', async function(request, response){
    const categories = await CategoriesModel.getCategories();

    return response.json(categories);
})

router.get('/:id', async function(request, response){
    const categories = await CategoriesModel.getCategoriesById(request.params.id);

    return response.json(categories);
})

router.post('/', async function(request, response){
    const createCategory = await CategoriesModel.createCategory({
        category_name: request.body.category_name
    })
    return response.json(createCategory);
})

router.delete('/:id', async function(request, response){
    const deleteCategory = await categoryModel.deleteCategory(request.params.id);

    response.json({
        success: deleteCategory.affectedRows > 0
    })
})

router.put('/:id', async function(request, response){
    const updateCategory = await categoryModel.updateCategory(request.params.id, request.body);
    response.json({
        success: updateCategory.affectedRows > 0
    })
})

module.exports = router;
