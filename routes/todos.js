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

router.delete('/:id', async function(request, response){
    const deleteTodo = await TodosModel.deleteTodo(request.params.id);

    response.json({
        success: deleteTodo.affectedRows > 0
    })
})

router.put('/:id', async function(request, response){
    const updateTodo = await TodosModel.updateTodo(request.params.id, request.body);
    response.json({
        success: updateTodo.affectedRows > 0
    })
})

module.exports = router;

