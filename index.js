const express = require('express');
const { connectToDB } = require('./models');
const userRouter = require('./routes/users');
const todosRouter = require('./routes/todos');
const categoryRouter = require('./routes/categories');
const app = express();
app.use(express.json());

app.get('/', function(request, response){
    response.send('Hello World!');
})

app.get('/about', function(request, response){
    response.send('<h2 style="color: skyblue;">About Page</h2>');
})

app.use('/categories', categoryRouter);
app.use('/users', userRouter);
app.use('/todos', todosRouter);





app.listen(3000, function(){
    console.log('Server is running on http://localhost:3000');
});