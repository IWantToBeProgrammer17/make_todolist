const express = require('express');

const router = express.Router();

const USERS = [
    {
        username: 'azky',
        password: 'password',
        name: 'Azky',
        email: 'azky@gmail.com'
    }
]

const token = [];

router.post('/signin', async function(request, response){
    const username = request.body.username;
    const password = request.body.password;

    const user = USERS.find(u => u.username === username);
    
    if(!user){
        return response.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }           

    if(user.password !== password){
        return response.status(401).json({
            status: 'error',
            message: 'Invalid password'
        });
    }

    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    token.push(randomString);

    return response.json({
        status: 'success',
        message: 'Signin successful',
        data: {
            username: user.username,
            name: user.name,
            email: user.email,
            token: randomString
        }
    });

})

module.exports = router;