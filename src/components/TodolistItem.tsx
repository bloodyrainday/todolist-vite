import React from "react";
import { TaskType } from "../App";

type TodolistItemPropsType = {
  tasks: TaskType[];
  filterButton: string[];
};

const TodolistItem = (props: TodolistItemPropsType) => {
  return (
    <div>
      <h3>What to learn</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((task: TaskType, i) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />{" "}
              <span>{task.title}</span>
            </li>
          );
        })}
      </ul>
      <div>
        {props.filterButton.map((btn, i) => {
          return <button key={i}>{btn}</button>;
        })}
      </div>
    </div>
  );
};

export default TodolistItem;
