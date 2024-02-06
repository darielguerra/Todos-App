import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

/* Todo Object:   
                 description: string
                 completed: boolean   */ 

function App() {

  const api = `http://localhost:8080`;  

  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    Axios.get(`${api}/todos`).then(res => {
      setTodos(res.data);
    })
  }, [])

  const createTodo = () => {
    Axios.post(`${api}/createtodo`,{
     description: description,
     completed: completed
    }).then(res => {
      setTodos([...todos, {description:description, completed:completed}]);
    })
  }

  const deleteTodo = todo => {
    Axios.delete(`${api}/deletetodo/${todo._id}`)
    .then(res => {
      setTodos(todos => todos.filter(todo => todo._id !== res._id))}
      )}
      
/*
  const toggleCompleted = id => {
    Axios.put(`${api}/todocompleted/${id}`).then(res => {
      setCompleted(!completed);
    })
  }
*/

  return (
    <div className="container">
       <div className="todos">
          {todos.map(todo => { 
            return(
              <div key={todo._id}>
                <h3 className="todo">{todo.description}</h3>
                <input type="checkbox" 
                    /* 
                     value={todo.completed}
                     onChange={toggleCompleted(todo._id)} 
                   */
                />
                <button onClick={() => deleteTodo(todo)}>Delete</button>
              </div>
          )})}
       </div>
       <div>
        <input type="text" placeholder="Description" onChange={event => setDescription(event.target.value)}/>
        <button onClick={createTodo}>Add Todo</button>
       </div>
    </div>
  );
}

export default App;
