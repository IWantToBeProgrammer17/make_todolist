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

module.exports = router;