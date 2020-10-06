import React, { useState ,useEffect} from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

const TodoList =({items}) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
   if(items.length)
   {
     setTodos(items)
   }
  }, [items])
  console.log({items})
  
  const addTodo = todo => {
    if (!todo.Name || /^\s*$/.test(todo.Name)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };


  const updateTodo = (todoId, newValue) => {
    if (!newValue.Name || /^\s*$/.test(newValue.Name)) {
      return;
    }
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const deleteTodo = (_id) => {
    return fetch(`https://app-todosserver.herokuapp.com/${_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
  const removeTodo = _id => {
    deleteTodo(_id).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        const removedArr = todos.filter(todo => todo._id !== _id);
        setTodos(removedArr);
      }
    });
  };




  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;