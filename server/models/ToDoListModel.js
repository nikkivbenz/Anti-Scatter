const mongoose = require('mongoose');
const {User}  = require('./server/models/UserModel.js');

const todoSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: [true, "User is required"],
    }, 
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
