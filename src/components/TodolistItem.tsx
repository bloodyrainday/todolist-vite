import React from "react";
import { TaskType } from "../App";
import Button from "./Button";

type TodolistItemPropsType = {
  tasks: TaskType[];
  removeTask: (taskId: string) => void;
};

const TodolistItem = (props: TodolistItemPropsType) => {
  return (
    <div>
      <h3>What to learn</h3>
      <div>
        <input />
        <Button title="+" callback={() => {}} />
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
        <Button title="All" callback={() => {}} />
        <Button title="Active" callback={() => {}} />
        <Button title="Completed" callback={() => {}} />
      </div>
    </div>
  );
};

export default TodolistItem;
