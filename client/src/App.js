import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";

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


  return (
    <div className="App">
       <div>
          {todos.map(todo => { 
            return (
                <h3>{todo.completed}<input type="checkbox" />{todo.description}</h3>
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
