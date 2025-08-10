const express = require('express');
const { connectToDB } = require('./models');
const userRouter = require('./routes/users');
const app = express();
app.use(express.json());

app.get('/', function(request, response){
    response.send('Hello World!');
})

app.get('/about', function(request, response){
    response.send('<h2 style="color: skyblue;">About Page</h2>');
})

app.use('/users', userRouter);

app.get('/todos', async function(request, response){
    const connection = await connectToDB();
    const [todos] = await connection.query('SELECT * FROM todos');
    console.log('Todos:', todos);

    await connection.end();
    return response.json(todos);
})
app.get('/categories', async function(request, response){
    const connection = await connectToDB();
    const [categories] = await connection.query('SELECT * FROM categories');
    console.log('Categories:', categories);

    await connection.end();
    return response.json(categories);
})

app.get('/categories/:id', async function(request, response){
    const connection = await connectToDB();
    const [categories] = await connection.query(`SELECT * FROM categories WHERE id = ${request.params.id}`);

    await connection.end();
    return response.json(categories);
})

app.get('/todos/:id', async function(request, response){
    const connection = await connectToDB();
    const [todos] = await connection.query(`SELECT * FROM todos WHERE id = ${request.params.id}`);

    await connection.end();
    return response.json(todos);
})

app.listen(3000, function(){
    console.log('Server is running on http://localhost:3000');
});