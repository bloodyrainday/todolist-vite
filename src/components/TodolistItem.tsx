import React from "react";
import { TaskType } from "../App";
import Button from "./Button";

type TodolistItemPropsType = {
  title: string;
  tasks: TaskType[];
  todolistId: string;
  removeTask: (todolistId: string, taskId: string) => void;
};

const TodolistItem = (props: TodolistItemPropsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => {
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />{" "}
              <span>{t.title}</span>
              <Button
                title="x"
                callback={() => props.removeTask(props.todolistId, t.id)}
              />
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
