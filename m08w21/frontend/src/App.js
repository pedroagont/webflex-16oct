import { useState } from 'react';
import './App.css';

function App() {
  const [todosData, setTodosData] = useState([]);

  const fetchTodosData = () => {
    fetch('http://localhost:8080/todos')
      .then((res) => res.json())
      .then((data) => setTodosData(data));
  };

  return (
    <div>
      <h1>Here are your todos!</h1>
      <button onClick={fetchTodosData}>Click to get todos!</button>
      <ul>
        {todosData.map((todo, index) => (
          <li key={index}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
