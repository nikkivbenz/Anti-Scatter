const router = require("express").Router();
const {createTodo, getTodos } = require('../server/controllers/ToDoListController.js');

router.post('/todos', createTodo);

router.get('/todos', getTodos);

module.exports = router;
