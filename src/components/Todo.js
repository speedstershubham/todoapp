import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const updatetodo = ({todoId, newValue}) => {
    return fetch(`https://app-todosserver.herokuapp.com/${todoId}`,{
     method:"POST",
     headers:{
      Accept:"application/json",
       "Content-Type":"application/json"
     },
     body:JSON.stringify(newValue)
   })
   .then(res =>{
     return res.json();
   })
   .catch(err => console.log(err))
 }


  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo._id} onClick={() => completeTodo(todo._id)}>
        {todo.Name}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo._id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo._id, value: todo.Name })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Todo;