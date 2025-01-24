import React, { ChangeEvent, useState } from "react";
import { FilterType, TaskType } from "../App";
import Button from "./Button";
import "../App.css";

type TodolistItemPropsType = {
  tasks: TaskType[];
  removeTask: (taskId: string) => void;
  filterTasks: (filter: FilterType) => void;
  setFilter: (filter: FilterType) => void;
  addTask: (title: string) => void;
  filter: FilterType;
  changeTaskStatus: (taskId: string, status: boolean) => void;
};

const TodolistItem = (props: TodolistItemPropsType) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
    setError(null);
  };

  const onAddTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      props.addTask(taskTitle);
      setTaskTitle("");
    } else {
      setError("title is required");
    }
  };

  return (
    <div>
      <h3>What to learn</h3>
      <div>
        <input
          className={error ? "error" : ""}
          value={taskTitle}
          onChange={onChangeTitleHandler}
        />
        <Button title="+" callback={onAddTaskHandler} />
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((task: TaskType, i) => {
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={(e) =>
                  props.changeTaskStatus(task.id, e.currentTarget.checked)
                }
              />{" "}
              <span>{task.title}</span>
              <Button title="x" callback={() => props.removeTask(task.id)} />
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          className={props.filter === "all" ? "active" : ""}
          title="All"
          callback={() => props.setFilter("all")}
        />
        <Button
          className={props.filter === "active" ? "active" : ""}
          title="Active"
          callback={() => props.setFilter("active")}
        />
        <Button
          className={props.filter === "completed" ? "active" : ""}
          title="Completed"
          callback={() => props.setFilter("completed")}
        />
      </div>
    </div>
  );
};

export default TodolistItem;
