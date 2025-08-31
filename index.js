const express = require('express');
const path = require('path');
const { connectToDB } = require('./models');
const userRouter = require('./routes/users');
const todosRouter = require('./routes/todos');
const categoryRouter = require('./routes/categories');
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/', function(request, response){
    response.send('Hello World!');
})

app.get('/about', function(request, response){
    response.send('<h2 style="color: skyblue;">About Page</h2>');
})

app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);
app.use('/api/todos', todosRouter);

app.get('/todos', async function(request, response){
    return response.sendFile(path.join(__dirname + '/views/todos/index.html'));
});

app.get('/categories', async function(request, response){
    return response.sendFile(path.join(__dirname + '/views/categories/index.html'));
});



app.listen(3000, function(){
    console.log('Server is running on http://localhost:3000');
});