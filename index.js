const express = require('express');
const path = require('path');
const { connectToDB } = require('./models');
const userRouter = require('./routes/users');
const ollamaRouter = require('./routes/ollama');
const todosRouter = require('./routes/todos');
const categoryRouter = require('./routes/categories');
const authRouter = require('./routes/auth');
const app = express();
const cors = require('cors');
const proxy = require('express-http-proxy');

app.use(express.json());
app.use(express.static('public'));

app.get('/about', function(request, response){
    response.send('<h2 style="color: skyblue;">About Page</h2>');
})
app.use(cors());
app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);
app.use('/api/todos', todosRouter);
app.use('/api/ollama', ollamaRouter);
app.use('/api/auth', authRouter);

app.use('/', proxy('localhost:5173'));

app.get('/todos', async function(request, response){
    return response.sendFile(path.join(__dirname + '/views/todos/index.html'));
});

app.get('/categories', async function(request, response){
    return response.sendFile(path.join(__dirname + '/views/categories/index.html'));
});



app.listen(3000, function(){
    console.log('Server is running on http://localhost:3000');
});