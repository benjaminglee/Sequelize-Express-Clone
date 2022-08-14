const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');

router.get('/', (req, res) => {
  res.send(todos.listPeople());
});

router.get('/:name/tasks', (req, res) => {
  res.send(todos.list(req.params.name));
});

router.post('/:name/tasks', (req, res) => {
  if (todos.list(req.params.name)) {
    res.sendStatus(404);
  } else if (req.body.content === '') {
    res.sendStatus(400);
  } else {
    todos.add(req.params.name, req.body);
    res.status(201).send(req.body);
  }
});
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.
