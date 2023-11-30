const express = require('express');
const app = express();
//const mongoose = app.mongoose;



//const todoModel = require('./schema')

//app.use('cors');
//const json = app.use('express.json');

app.listen(8080);


//mongoose.process.env.data



//get
app.get('/todos', async (req, res) =>
  {
    const body = req.body;
    const todo = todoModel(body);
  },
await {
    console.log(res.todo);
    return json(res.todo);
}
);


//create
app.post('/todos', async (req, res) => {
    const todo = todoModel(response => response.body);
}
await {
    console.log(todo);
    app.save(todo);
}
)
