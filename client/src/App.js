import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import "./styles/App.css";

/* Todo Object:   
                 description: string
                 completed: boolean   */ 

function App() {

  const api = `http://localhost:8080`;  

  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  
  useEffect( () => {
     GetTodos();
     //when I had axios.get inside useEffect,
     //it crashed when there was no data in database
     //calling a seperate function fixed this
  }, [])

   const GetTodos = () => {
      Axios.get(`${api}/todos`)
      .then(res => setTodos(res.data))
      .catch((err) => console.error("Error: ", err));
   }


  const createTodo = async () => {
     const todo = await Axios.post(`${api}/createtodo`,{
     description: description,
     completed: completed
    })
    
    setTodos([...todos, todo.data]);
    //adding todo.data instead of {description:description, completed:completed}
    //caused crashing issue when deleting things created
    //after the last page refresh to be fixed
    
    setDescription(""); 
    //this clears out input text after pressing create button
    //input box must have value={description} property to work
  }

  const deleteTodo = async id => {
    await Axios.delete(`${api}/deletetodo/${id}`);

    setTodos(todos => todos.filter(todo => todo._id !== id));
  }    
  

  const toggleCompleted = async (e, todo) => {
    setCompleted(e.target.checked);

    console.log(completed)

    setTodos(todos => todos.map(thisTodo => {
      if(thisTodo._id === todo._id) {
        thisTodo.completed = completed;
      }
      return thisTodo;
    } ))

    //todo.completed = completed;    
    //todo.completed = !todo.completed;   
    //todo.completed = !completed;  

    const data = await Axios.put(`${api}/todocompleted/${todo._id}`)

    console.log(data);
  }


  return (
    <div className="container">
       <div className="todos">
          {todos.map(todo => { 
            return(
              <div key={todo._id}>
                <h3 className="todo">{todo.description}</h3>
                <input type="checkbox" 
 
                     //value={todo.completed}
                     checked={todo.completed}
                     onClick={(e) => toggleCompleted(e, todo)} 
                     //onChange={() => toggleCompleted(todo._id)} 
                     //onChange={e => toggleCompleted("completed", e.target.checked)} 
                     //onChange={toggleCompleted} 
                     //first had {toggleCompleted(todo._id)} 
                     //this caused put to be called over and over
   
                />
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                   {/*first had {deleteTodo(todo._id)} instead
                   this caused all data to get deleted, deleteTodo gets called over and over*/}
              </div>
          )})}
       </div>
       <div>
        <input type="text" placeholder="Description" onChange={event => setDescription(event.target.value)} value={description}/>
        <button onClick={createTodo}>Add Todo</button>
       </div>
    </div>
  );
}

export default App;
