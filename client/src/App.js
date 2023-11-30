import { useEffect, useState } from "react";

function App() {

  const api = `http://localhost:8080`;

  const {todos, setTodos} = useState([]);

  /*
  const something = useEffect(fetch{`api${/todos}`, (res => res.json)
    .then(setTodos(res.json) )
  , [] };

*/

  return (
    <div className="App">
       <div>
          {todos.map(todo => )}
          {todo.description}
          {todo.completed}
       </div>
    </div>
  );
}

export default App;
