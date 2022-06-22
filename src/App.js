import "./App.css";
import React, { useState, useEffect } from "react";
import Modal from "./components/Modal/Modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

function App() {
  const [isModalVisible, changeModalVisibility] = useState(false);

  if (!localStorage.getItem("allTasks")) {
    const allTasks = [];
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
  }

  const tasks = JSON.parse(localStorage.getItem("allTasks"));
  const todoTasks = [];
  const wipTasks = [];
  const completedTasks = [];
  // can store tasks in seperate file, read from that file, then use this function to categorize the tasks
  const categorize = (tasksArr) => {
    tasksArr.map((task) => {
      if (task.status === 0) {
        todoTasks.push(task);
      } else if (task.status === 1) {
        wipTasks.push(task);
      } else if (task.status === 2) {
        completedTasks.push(task);
      }
    });
  };

  const recategorize = (task, direction) => {
    // get all tasks from localStorage
    let allTasks = JSON.parse(localStorage.getItem("allTasks"));
    console.log(allTasks);
    // find selected task in all tasks array
    let selectedTask = allTasks.find((i) => i.id === task.id);
    console.log(selectedTask);
    // remove selected task from allTasks array
    const newTasksArr = allTasks.filter((i) => i.id !== selectedTask.id);
    console.log(newTasksArr);
    // change status of selected task
    if (direction === "right") {
      if (selectedTask.status === 2) {
        selectedTask.status = 0;
      } else {
        selectedTask.status += 1;
      }
    } else if (direction === "left") {
      if (selectedTask.status === 0) {
        selectedTask.status = 2;
      } else {
        selectedTask.status -= 1;
      }
    }
    // push modified task back into tasks array
    newTasksArr.push(selectedTask);
    console.log(newTasksArr);
    // insert the new tasks array into localStorage
    localStorage.setItem("allTasks", JSON.stringify(newTasksArr));
    window.location.replace("/");
  };

  const deleteTask = (task) => {
    let allTasks = JSON.parse(localStorage.getItem("allTasks"));
    allTasks = allTasks.filter((i) => i.id !== task.id);
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    window.location.replace("/");
  };

  categorize(tasks);

  return (
    <div className="app">
      {isModalVisible && <Modal />}
      <button
        className="add-task-btn"
        onClick={() => changeModalVisibility(!isModalVisible)}
      >
        <AddCircleIcon style={{ height: "100%", width: "auto" }} />
      </button>
      <div className="todo-tasks col">
        <div className="header">
          <img src="https://www.svgrepo.com/show/397690/red-circle.svg"></img>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Todo</h1>
        </div>
        <ul className="tasks">
          {todoTasks &&
            todoTasks.map((task) => (
              <li className="task" key={task.name}>
                <div className="task-name">{task.name}</div>
                <div
                  className="delete-icon"
                  onClick={() => deleteTask(task)}
                  style={{
                    height: "100%",
                    cursor: "pointer",
                  }}
                >
                  <DeleteIcon />
                </div>
                <div
                  className="arrows"
                  style={{
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <div
                    className="left-arrow"
                    style={{ cursor: "pointer" }}
                    onClick={() => recategorize(task, "left")}
                  >
                    <ArrowLeftIcon />
                  </div>
                  <div
                    className="right-arrow"
                    style={{ cursor: "pointer" }}
                    onClick={() => recategorize(task, "right")}
                  >
                    <ArrowRightIcon />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="wip-tasks col">
        <div className="header">
          <img src="https://www.svgrepo.com/show/398719/yellow-circle.svg"></img>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Work In Progress
          </h1>
        </div>
        <ul className="tasks">
          {wipTasks &&
            wipTasks.map((task) => (
              <li className="task" key={task.name}>
                <div className="task-name">{task.name}</div>
                <div
                  className="delete-icon"
                  onClick={() => deleteTask(task)}
                  style={{
                    height: "100%",
                    cursor: "pointer",
                  }}
                >
                  <DeleteIcon />
                </div>
                <div
                  className="arrows"
                  style={{
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <div
                    className="left-arrow"
                    style={{ cursor: "pointer" }}
                    onClick={() => recategorize(task, "left")}
                  >
                    <ArrowLeftIcon />
                  </div>
                  <div
                    className="right-arrow"
                    style={{ cursor: "pointer" }}
                    onClick={() => recategorize(task, "right")}
                  >
                    <ArrowRightIcon />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="completed-tasks col">
        <div className="header">
          <img src="https://www.svgrepo.com/show/396579/green-circle.svg"></img>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Completed
          </h1>
        </div>
        <ul className="tasks">
          {completedTasks &&
            completedTasks.map((task) => (
              <li className="task" key={task.name}>
                <div className="task-name">{task.name}</div>
                <div
                  className="delete-icon"
                  onClick={() => deleteTask(task)}
                  style={{
                    height: "100%",
                    cursor: "pointer",
                  }}
                >
                  <DeleteIcon />
                </div>
                <div
                  className="arrows"
                  style={{
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <div
                    className="left-arrow"
                    style={{ cursor: "pointer" }}
                    onClick={() => recategorize(task, "left")}
                  >
                    <ArrowLeftIcon />
                  </div>
                  <div
                    className="right-arrow"
                    style={{ cursor: "pointer" }}
                    onClick={() => recategorize(task, "right")}
                  >
                    <ArrowRightIcon />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
