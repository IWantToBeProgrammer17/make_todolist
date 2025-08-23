const express = require('express');
const TodosModel = require('../models/todos.model');
const router = express.Router();

router.get('/', async function(request, response){
    const todos = await TodosModel.getTodos();
    return response.json(todos);
})

router.get('/:id', async function(request, response){
    const todos = await TodosModel.getTodoById(request.params.id);
    return response.json(todos);
})
router.post('/', async function(request, response){
    const createTodo = await TodosModel.createTodo({
        title: request.body.title,
        description: request.body.description,
        is_completed: request.body.is_completed,
        user_id: request.body.user_id,
        category_id: request.body.category_id,
        due_date: request.body.due_date
    })
    return response.json(createTodo);
})
module.exports = router;

