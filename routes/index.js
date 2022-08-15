const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');

router.get('/', (req, res) => {
  res.send(todos.listPeople());
});

router.get('/:name/tasks', (req, res) => {
  const taskStatus = req.query.status === 'complete' ? true : false;
  const taskList = todos.list(req.params.name);
  if (!taskList) {
    res.sendStatus(404);
  } else if (Object.keys(req.query).length) {
    let filtered = taskList.filter((task) => task.complete === taskStatus);
    res.send(filtered);
  } else {
    res.send(taskList);
  }
});

router.post('/:name/tasks', (req, res) => {
  if (req.body.content === '') {
    res.sendStatus(400);
  } else {
    todos.add(req.params.name, req.body);
    res.status(201).send(req.body);
  }
});

router.put('/:name/tasks/:index', (req, res) => {
  const { name, index } = req.params;
  todos.list(name)[index].complete = true;
  res.send();
});

router.delete('/:name/tasks/:index', (req, res) => {
  const { name, index } = req.params;
  todos.remove(name, index);
  res.sendStatus(204);
});
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.
