import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';


const TodoList = () => {

     // const [data, setData] = useState([]);
     const navigate = useNavigate();

     useEffect(() => {
         const verifyCookie = async () => {
             try {
                 const storedToken = localStorage.getItem("token");
                 if (!storedToken) {
                     navigate("/login");
                     return;
                 }
 
                 const { data } = await axios.post(
                     "https://anti-scatter-36f9c5f65c17.herokuapp.com/",
                     { token: storedToken }
                 );
 
                 if (!data.status) {
                     localStorage.removeItem("token");
                     navigate("/login");
                 }
 
                 // Fetch dashboard data if token is valid
                //  navigate('/TodoList')
             } catch (error) {
                 console.error("Error verifying cookie:", error);
                 navigate("/login");
             }
         };
 
         verifyCookie();
     }, [navigate]);

     
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedTasks, setSelectedTasks] = useState([]);
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    // Check for due tasks and show notifications
    tasks.forEach((task) => {
      const dueDateObj = new Date(task.dueDate);
      const currentDate = new Date();
      if (
        dueDateObj.getFullYear() === currentDate.getFullYear() &&
        dueDateObj.getMonth() === currentDate.getMonth() &&
        dueDateObj.getDate() === currentDate.getDate()
      ) {
        // Notify user when the due date matches the current date
        toast.info(`Task "${task.text}" is due today!`, { autoClose: 5000 });
      }
    });
  }, [tasks]);
  const addTask = () => {
    if (newTask.trim() !== "" && dueDate !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, dueDate }]);
      setNewTask("");
      setDueDate("");
    }
  };
  const toggleTaskSelection = (taskId) => {
    const isSelected = selectedTasks.includes(taskId);
    if (isSelected) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };
  const removeSelectedTasks = () => {
    const updatedTasks = tasks.filter(
      (task) => !selectedTasks.includes(task.id)
    );
    setTasks(updatedTasks);
    setSelectedTasks([]);
  };
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => toggleTaskSelection(task.id)}
            style={{
              textDecoration: selectedTasks.includes(task.id)
                ? "line-through"
                : "none",
            }}
          >
            {task.text} - Due Date: {task.dueDate}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      {selectedTasks.length > 0 && (
        <div>
          <button onClick={removeSelectedTasks}>Remove Selected</button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
export default TodoList;
