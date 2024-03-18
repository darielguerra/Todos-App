import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import TodoModel from './models/Todo.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))//prints out a short log whenever a request is made

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(8080);
  console.log('server running on port 8080');
})

app.get('/todos', async (req, res) => {
    const allTodos = await TodoModel.find({});
    res.json(allTodos);
})

app.post('/createtodo', (req, res) => {
  const newTodo = new TodoModel(req.body);
  newTodo.save(); 
  res.json(newTodo);
})

app.delete('/deletetodo/:id', async (req, res) => {
  const result = await TodoModel.findByIdAndDelete(req.params.id);
  res.json(result);
})

app.put('/todocompleted/:id', async (req, res) => {
   console.log(req.body);
   const id = req.params.id;
   const todo = await TodoModel.findByIdAndUpdate({_id: id}, req.body, { new: true });
   console.log(todo.completed);
   res.json(todo);
})

