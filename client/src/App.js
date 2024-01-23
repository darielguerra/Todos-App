import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

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
    Axios.delete(`${api}/deletetodo/${todo._id}`).then(res => {
      alert(`${todo.description} deleted`);
    })     
  }

  const toggleCompleted = id => {
    Axios.put(`${api}/todocompleted/${id}`).then(res => {
      setCompleted(!completed);
    })
  }

  return (
    <div className="cointaner">
       <div className="todos">
          {todos.map(todo => { 
            return(
              <div key={todo._id}>
                <h3 className="todo">{todo.description}</h3>
                <input type="checkbox"
                  onChange={toggleCompleted(todo._id)}>
                 {todo.coompleted}</input>
                <button onClick={deleteTodo(todo)}>Delete</button>
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
