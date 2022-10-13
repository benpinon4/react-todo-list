import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";




const ToDoListContainer = (props) => {
  return (
    <div>

      {props.todoList.map((todo, index) => {
        return <ToDoListItem todo={todo} key={index} handleUpdate={props.handleUpdate} />;
      })}
    </div>
  );
};




const ToDoForm = (props) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");


  return (
    <div>
      <label>Title:</label>
      <input
        type="text"
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      ></input>
      <br></br>
      <label>Priority:</label>
      <select
        onChange={(event) => {
          setPriority(event.target.value);
        }}
      >
        <option value=""></option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <br></br>
      <label>Description:</label>
      <textarea
        type="text"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      ></textarea>
      <br></br>
      <button onClick={()=>{
        props.handleAddTo(title,priority,description)
      }}>Add ToDo Item</button>
    </div>
  );
};



const ToDoListItem = (props) => {
  const title = props.todo.title
  const creationDate = props.todo.creationDate
  return (
    <div className={`to-do-item ${props.todo.priority}`} >
      <h2 className={`to-do-title ${props.todo.isComplete}`}>Title: {props.todo.title}</h2>
      <p>Priority: {props.todo.priority}</p>
      <p>Description: {props.todo.description}</p>
      <p>Creation Date: {props.todo.creationDate}</p>
      {/* {props.todo.completedDate !== null && ( */}
        <p>Completed Date: {props.todo.completedDate}</p>
      {/* )} */}
      <button onClick={()=>{
        props.handleUpdate(title, creationDate)
      }}>Complete</button>
    </div>
  );
};



const App = () => {
  const [todoList, settodoList] = useState([
    // {
    //   title: "Implement ToDo List",
    //   priority: "High",
    //   isComplete: false,
    //   description: "Implement the todo list application",
    //   creationDate: new Date().toString(),
    //   completedDate: null,
    // },

  ]);

  const handleAddTo = (title, priority, description) => {
    const newToDo = {
      title,
      priority,
      incomplete: false,
      description,
      creationDate: new Date().toString(),
      completedDate: null
    }
  const todoListCopy = [...todoList, newToDo]
  settodoList(todoListCopy)
  }

  const handleUpdate = (title, creationDate) => {
    const todoListCopy = [...todoList]
    // const updatedToDoIndex = todoListCopy.findIndex((todo)=>{
    //   return todo.title === title && todo.creationDate === creationDate
    // })
    // console.log(updatedToDoIndex)
    const updatedToDoList = todoListCopy.map((todo)=>{

      if(todo.title === title && todo.creationDate === creationDate){
      return {
          title: todo.title,
          priority: todo.priority,
          isComplete: true,
          description: todo.description,
          creationDate: todo.creationDate,
          completedDate: new Date().toString()

        }
        
      } else {
        return{
        title: todo.title,
        priority: todo.priority,
        isComplete: false,
        description: todo.description,
        creationDate: todo.creationDate,
        completedDate: null
      }
      
    }})
    
  //   const findToDoIndex = todoListCopy.findIndex(()=>{
  //       return title && creationDate
  //   })
  // const todoListItemToUpdate = todoListCopy[findToDoIndex]
  // console.log(todoListItemToUpdate.title)
  // console.log(todoListCopy)
  
  console.log(updatedToDoList)
  settodoList(updatedToDoList)

  // console.log(updatedToDo)

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>ToDo List</h1>
        <ToDoForm handleAddTo={handleAddTo} />
        <ToDoListContainer todoList={todoList} handleUpdate={handleUpdate}/>

      </header>
    </div>
  );
};

export default App;
