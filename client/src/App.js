import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {

  const api = `http://localhost:8080`;

  const [todos, setTodos] = useState([]);

useEffect(() => {
  Axios.get(`${api}/todos`).then(response => {
    setTodos(response.data);
  })
}, [])


  return (
    <div className="App">
       <div>
          {todos.map(todo => { 
            return (
                <h3>{todo.completed}<input type="checkbox" />{todo.description}</h3>
        )})}
       </div>

       <div>
        <input type="text" placeholder="Description" />
        <button>Add Todo</button>
       </div>
       <div>
        
       </div>
    </div>
  );
}

export default App;
