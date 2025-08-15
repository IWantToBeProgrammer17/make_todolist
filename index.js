const express = require('express');
const { connectToDB } = require('./models');
const userRouter = require('./routes/users');
const todosRouter = require('./routes/todos');
const app = express();
app.use(express.json());

app.get('/', function(request, response){
    response.send('Hello World!');
})

app.get('/about', function(request, response){
    response.send('<h2 style="color: skyblue;">About Page</h2>');
})

app.use('/users', userRouter);
app.use('/todos', todosRouter);


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



app.listen(3000, function(){
    console.log('Server is running on http://localhost:3000');
});