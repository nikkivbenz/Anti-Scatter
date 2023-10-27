const { User } = require("../Models/UserModel");
const Todo = require('./server/models/ToDoListModel.js');

// Controller to create a new to-do item
module.exports.createTodo = (req, res) => {
  try {
  
    const newTodo = new Todo(req.body);
  
    newTodo.save((err) => {
      if (err) {
        return res.status(400).json({ error: 'Failed to save the to-do item' });
      }
      res.status(201).json(newTodo);
    });
  }catch(err){
    console.log(err);
    res.status(400).json({ error: 'Failed to save the to-do item' });
  }
};
  
  // Controller to get a list of to-do items
  module.exports.getTodos = (req, res) => {
    try {
      Todo.find({}, (err, todos) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to retrieve to-do items' });
        }
        res.status(200).json(todos);
      });
    } catch(err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to retrieve to-do items' });
    }
  };