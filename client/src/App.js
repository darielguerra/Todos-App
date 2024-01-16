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
    Axios.get(`${api}/todos`).then(response => {
      setTodos(response.data);
    })
  }, [])

  const createTodo = () => {
    Axios.post(`${api}/createtodo`,{
     description: description,
     completed: completed
    }).then(response => {
      //alert("Todo Created");
      setTodos([...todos, {description:description, completed:completed}]);
    })
  }

  const deleteTodo = () => {
    fetch(api + "/deletetodo/todoid")
     // .then(res => )
  }


  return (
    <div className="structure">
       <div className="todos">
          {todos.map(todo => { (
           // return (
              <div key={todo._id}>
                <h3 className="todo">{todo.descriptio}</h3>
                <input type="checkbox">{todo.coompleted}</input>
                
              </div>
        )})}
       </div>

       <div>
        <input type="text" placeholder="Description" onChange={event => setDescription(event.target.value)}/>
        <button onClick={createTodo}>Add Todo</button>
       </div>
       <div>
        
       </div>
    </div>
  );
}

export default App;
