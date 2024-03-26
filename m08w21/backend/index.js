// Requirements
const PORT = 8080;
const express = require('express'); // npm i express
const app = express();
const cors = require('cors'); // npm i cors
const uniqid = require('uniqid'); // npm i uniqid
const morgan = require('morgan'); // npm i morgan

// Middleware
app.use(morgan('dev')); // logger
app.use(cors()); // accept request from same hostname
app.use(express.json()); // accept req.body

const data = [
  { id: uniqid(), task: 'buy milk', done: false },
  { id: uniqid(), task: 'wash dishes', done: false },
  { id: uniqid(), task: 'clean up', done: true },
];

// Endpoints/Routes
// TODO CRUD REST API
// Create - POST
app.post('/todos', (req, res) => {
  // create new todo object
  const newTodo = {
    id: uniqid(),
    task: req.body.task,
    done: false,
  };

  // add object to database
  data.push(newTodo);

  // respond back
  res.status(201).json(newTodo);
});

// Read all - GET
app.get('/todos', (req, res) => {
  res.json(data);
});

// Read one - GET
app.get('/todos/:id', (req, res) => {
  const { id } = req.params; // grab id from param
  const todoObj = data.find((todo) => todo.id === id); // search todoObj in database by id
  res.status(200).json(todoObj); // respond back
});

// Update - PUT
app.put('/todos/:id/toggle', (req, res) => {
  const { id } = req.params; // grab id from param
  const todoIndex = data.findIndex((todo) => todo.id === id); // search todoIndex in database by id

  // toggle done property true/false
  data[todoIndex] = {
    ...data[todoIndex],
    done: !data[todoIndex].done,
  };

  // respond back
  res.status(200).json(data[todoIndex]);
});

// Delete - DELETE
app.delete('/todos/:id/delete', (req, res) => {
  const { id } = req.params; // grab id from param
  const todoIndex = data.findIndex((todo) => todo.id === id); // search todoIndex in database by id
  data.splice(todoIndex, 1); // delete item from database
  res.status(204).json(); // respond back
});

// Listener
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
