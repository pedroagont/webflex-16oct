import { useState, useEffect } from 'react';
import './App.css';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const { id, task, done } = todo;
  return (
    <li className={done ? 'todo-done' : ''}>
      <span onClick={() => toggleTodo(id)}>{task}</span>
      <button onClick={() => deleteTodo(id)}>X</button>
    </li>
  );
}

function App() {
  const [todosData, setTodosData] = useState([]);

  const fetchTodosData = () => {
    fetch('http://localhost:8080/todos')
      .then((res) => res.json())
      .then((data) => setTodosData(data));
  };

  const toggleTodo = (id) => {
    fetch(`http://localhost:8080/todos/${id}/toggle`, { method: 'PUT' })
      .then((res) => res.json())
      .then(() => fetchTodosData());
  };

  const createTodo = (task) => {
    fetch(`http://localhost:8080/todos`, {
      method: 'POST',
      body: JSON.stringify({ task }),
      headers: {
        'Content-type': 'application/json',
      },
    }).then(() => fetchTodosData());
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:8080/todos/${id}/delete`, {
      method: 'DELETE',
    }).then(() => fetchTodosData());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.elements.task.value !== '') {
      createTodo(e.target.elements.task.value);
    }
  };

  useEffect(() => {
    fetchTodosData();
  }, []);

  return (
    <div>
      <h1>Here are your todos!</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name='task' />
        <button>Create!</button>
      </form>
      <ul>
        {todosData.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
