import React,{useState,useEffect} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import axios from "axios"


function App() {

const[items,setitem] = useState([])

useEffect(() =>{
  axios.get(`https://app-todosserver.herokuapp.com/`)
  .then(res =>{
    //console.log(res)
    setitem(res.data)
  })
  .catch( err =>{
    console.log(err)
  })
},[])

  return (
    <div className='todo-app'>
    <TodoList items={items}/>
    </div>
  );
}

export default App;
