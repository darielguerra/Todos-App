import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import './App.css';

/* Todo Object:   
                 description: string
                 completed: boolean   */ 

function App() {

  const api = `http://localhost:8080`;  

  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  
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
  

  const toggleCompleted = async (val, todo) => {
    console.log("value: " + val);
    const updatedTodo = { ...todo, completed: val };
    await Axios.put(`${api}/todocompleted/${todo._id}`, updatedTodo);
    setTodos(todos => todos.map(thisTodo => {
      if (thisTodo._id === todo._id) {
        return updatedTodo;
      }
     return thisTodo;
    }));
  }
  

  const createNote = async () => {
    const note = await Axios.post(`${api}/notes`,
      { 
        title: noteTitle,
        description: noteDescription
      }
    ) 
    setNotes([...notes, note.data]);
    
    setNoteDescription("");
  }

  /*The below code is an example of state not updating 
   *directly after it is assigned e.target.checked
  
  const toggleCompleted = async (e, todo) => {
    
    console.log("e " + e.target.checked);   //true
    console.log("c " + completed);          //false
    setCompleted(e.target.checked);         //state assighmnet
    console.log("c " + completed);          //false
  
    await Axios.put(`${api}/todocompleted/${todo._id}`,{      
      completed: completed
     }) 

    setTodos(todos => todos.map(thisTodo => {
      if(thisTodo._id === todo._id) {
        thisTodo.completed = completed;
      }
      return thisTodo;
    }))
    console.log("c " + completed);           //false
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
 
                    
                     //checked={todo.completed} //this made the check stay checked twice
                                              //but it seems to persist the checked state
                                              //after refresh
                     //onClick={(e) => toggleCompleted(e, todo)} 
                     //onChange={(e) => toggleCompleted(e, todo)}
                     
                     onClick={(e) => toggleCompleted(e.target.checked, todo)}
                     
                     //onChange={e => toggleCompleted("completed", e.target.checked)} 
                     //first had {toggleCompleted(todo)} 
                     //this caused put to be called over and over
                     value={todo.completed}
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
       <div className="notes-section">
        <div className="create-note">
          <input type="text" className="note-name-input" onChange={event => setNoteTitle(event.target.value)} value={noteTitle} />
          <input type="text" className="note-description-input" onChange={event => setNoteDescription(event.target.value)} value={noteDescription} />
          <button onClick={createNote}>Add</button>
        </div>

        <div className="notes">
          {notes.map(note=> {
            return(
              <div className="note-box" key={note._id}>
                <div className="note-name">
                  <p>{noteTitle}</p>
                </div>
                <div className="note-description">
                  <p>{noteDescription}</p>
                </div>
                <div className="delete-note">
                  <button className="note-delete-buton"></button>
                </div>
              </div>

          )})}
        </div>
       </div>
    </div>
  );
}

export default App;
