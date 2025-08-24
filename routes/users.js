const express = require('express');
const UsersModel = require('../models/user.model');
const router = express.Router();

router.get('/', async function(request, response){
    const user = await UsersModel.getUsers();

    return response.json(user);
})

router.get('/:id', async function(request, response){
    const users = await UsersModel.getUserById(request.params.id);

    return response.json(users);
})

router.post('/', async function(request, response){
    const createUser = await UsersModel.createUser({
        name: request.body.name,
        nickname: request.body.nickname,
        email: request.body.email,
        password: request.body.password
    })
    return response.json(createUser);
})

router.delete('/:id', async function(request, response){
    const deleteUser = await UsersModel.deleteUser(request.params.id);

    response.json({
        success: deleteUser.affectedRows > 0
    })
})

router.put('/:id', async function(request, response){
    const updateUser = await UsersModel.updateUser(request.params.id, request.body);
    response.json({
        success: updateUser.affectedRows > 0
    })
})

module.exports = router;