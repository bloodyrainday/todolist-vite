import React from "react";
import { TaskType } from "../App";
import Button from "./Button";

type TodolistItemPropsType = {
  tasks: TaskType[];
  filterButton: string[];
  deleteTask: (id: number) => void;
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
              <Button title="x" callback={() => props.deleteTask(task.id)} />
            </li>
          );
        })}
      </ul>
      <div>
        {props.filterButton.map((btn, i) => {
          return <Button key={i} title={btn} callback={() => {}} />;
        })}
      </div>
    </div>
  );
};

export default TodolistItem;
