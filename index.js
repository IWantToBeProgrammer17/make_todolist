const express = require('express');
const { connectToDB } = require('./models');
const app = express();

app.get('/', function(request, response){
    response.send('Hello World!');
})

app.get('/about', function(request, response){
    response.send('<h2 style="color: skyblue;">About Page</h2>');
})

app.get('/users', async function(request, response){
    const connection = await connectToDB();
    const [users] = await connection.query('SELECT * FROM users');
    console.log('Users:', users);

    await connection.end();
    return response.send(`
        <pre>${JSON.stringify(users, null, 2)}</pre>`)
})

app.get('/users/:id', async function(request, response){
    const connection = await connectToDB();
    const [users] = await connection.query(`SELECT * FROM users WHERE id = ${request.params.id}`);

    await connection.end();
    return response.send(`
        <pre>${JSON.stringify(users, null, 2)}</pre>`)
})

app.listen(3000, function(){
    console.log('Server is running on http://localhost:3000');
});