import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.listen(8080);

app.use(cors());
app.use(morgan('tiny'))//prints out a short log whenever a requet is made

app.get('/todos', (req, res) => {
  res.send("Hello")
})


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