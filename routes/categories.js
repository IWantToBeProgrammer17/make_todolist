const express = require('express');
const CategoriesModel = require('../models/category.model');
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

module.exports = router;
