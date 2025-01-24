import React, { ChangeEvent, useState } from "react";
import { FilterType, TaskType } from "../App";
import Button from "./Button";

type TodolistItemPropsType = {
  tasks: TaskType[];
  removeTask: (taskId: string) => void;
  filterTasks: (filter: FilterType) => void;
  setFilter: (filter: FilterType) => void;
  addTask: (title: string) => void;
};

const TodolistItem = (props: TodolistItemPropsType) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };

  const onAddTaskHandler = () => {
    props.addTask(taskTitle.trim());
    setTaskTitle("");
  };

  return (
    <div>
      <h3>What to learn</h3>
      <div>
        <input value={taskTitle} onChange={onChangeTitleHandler} />
        <Button
          title="+"
          callback={onAddTaskHandler}
          disabled={taskTitle.trim() === ""}
        />
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
