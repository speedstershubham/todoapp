import React, { useState, useEffect, useRef } from 'react';

const TodoForm =({ edit,onSubmit})  =>{
  const [input, setInput] = useState(edit ? edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

const formtodo = todos => {
   return fetch(`https://app-todosserver.herokuapp.com/`,{
    method:"POST",
    headers:{
     Accept:"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify(todos)
  })
  .then(res =>{
    return res.json();
  })
  .catch(err => console.log(err))
}

  const handleChange = e => {
    setInput(e.target.value);
  };


  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({
      Name: input
    });
    console.log(input)
    setInput('');
    formtodo({  Name: input })
    .then(data =>{
      console.log(data)
      if(data.error){
        setInput({...input,error:data.error})
      }
      else{
        setInput({
          ...input,
        Name:""
        })
      }
    })
    .catch(console.log("error"))
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='newValue'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='Name'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;