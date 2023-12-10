import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import TodoModel from './models/Todo.js';

dotenv.config();

const app = express();

//app.use(express.json);
app.use(cors());
app.use(morgan('tiny'))//prints out a short log whenever a requet is made





mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(8080);
  console.log('server running on port 8080');
})

/*
app.get('/todos', (req, res) => {
   if(TodoModel.find({}) ={}) {res.send("Hello")};
   if 
   console.log(`${req.method} and ${request.url}`);
   res.json({msg: 'Hello world!!!'});
})
*/


app.get('/todos', async (req, res) => {
  const allTodos = await TodoModel.find();
  res.json(allTodos);
})

/*
app.get('/todos', async (req, res) => {
  TodoModel.find({}, function (error, result){
    if(error){
      //console.log(error);
      res.json(error);
    }
    else {
      res.json(result);
    }
  });
  //res.send("Hello");
})
*/

//get
/*
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
*/