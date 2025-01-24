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
              <input type="checkbox" checked={task.isDone} />{" "}
              <span>{task.title}</span>
              <Button title="x" callback={() => props.removeTask(task.id)} />
            </li>
          );
        })}
      </ul>
      <div>
        <Button title="All" callback={() => props.setFilter("all")} />
        <Button title="Active" callback={() => props.setFilter("active")} />
        <Button
          title="Completed"
          callback={() => props.setFilter("completed")}
        />
      </div>
    </div>
  );
};

export default TodolistItem;
