import React, { useState, useEffect } from "react";
import "./Modal.css";

const Modal = () => {
  const tasks = JSON.parse(localStorage.getItem("allTasks"));
  const [formState, setFormState] = useState({
    task_title: "",
    task_description: "",
    task_status: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length === 0 ? 1 : (tasks[tasks.length - 1].id += 1),
      name: formState.task_name,
      description: formState.task_description,
      status: parseInt(formState.task_status),
    };
    const allTasks = JSON.parse(localStorage.getItem("allTasks"));
    console.log(allTasks);
    allTasks.push(newTask);
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    window.location.replace("/");
  };

  console.log(formState.task_status);

  return (
    <div className="modal">
      <form className="add-post-form">
        <input
          name="task_name"
          id="task_name"
          placeholder="Task name"
          onChange={handleChange}
        ></input>
        <input
          name="task_description"
          id="task_description"
          placeholder="Task description"
          onChange={handleChange}
        ></input>
        <select
          name="task_status"
          id="task_status"
          style={{ marginBottom: "10px" }}
          onChange={handleChange}
        >
          <option name="0" value="0">
            To Do
          </option>
          <option name="1" value="1">
            Work-In-Process
          </option>
          <option name="2" value="2">
            Completed
          </option>
        </select>
        <button onClick={handleFormSubmit}>Submit Task</button>
      </form>
    </div>
  );
};

export default Modal;
