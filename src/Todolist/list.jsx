import React, { useState, useEffect } from "react";
import api from "./axios.config";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get("/todos");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    try {
      const response = await api.post("/todos", {
        taskName: newTask,
        isCompleted: false,
      });

      setTodos([...todos, response.data]);
      setNewTask("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      const updatedTodo = { ...todo };
      updatedTodo.isCompleted = !todo.isCompleted;

      await api.put(`/todos/${todo.id}`, updatedTodo);
      const updatedTodos = todos.map((t) =>
        t.id === todo.id ? updatedTodo : t
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="todolist">
      <div className="search">
        <input type="text" placeholder="Search ex: todo 1" />
      </div>
      <form className="addTask" onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task........"
        />
        <button className="addtask-btn" type="submit">
          Add Task
        </button>
      </form>
      <div className="lists">
        {todos?.map((todo, id) => (
          <div
            key={id}
            className={`list ${todo.isCompleted ? "completed" : ""}`}
          >
            <p>{todo.taskName}</p>
            <div className="span-btns">
              {!todo.isCompleted && (
                <span
                  onClick={() => handleToggleComplete(todo)}
                  title="completed"
                >
                  ✓
                </span>
              )}
              <span
                className="delete-btn"
                onClick={() => handleDelete(todo.id)}
                title="delete"
              >
                x
              </span>
              {/* <span
                className="edit-btn"
                onClick={() => handleEdit(todo)}
                title="edit"
              >
                ↻
              </span> */}
            </div>
          </div>
        ))}
        {todos.length === 0 && <h1>No Records</h1>}
      </div>
    </div>
  );
};

export default Todolist;
