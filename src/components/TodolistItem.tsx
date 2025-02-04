import React from "react";
import { FilterType, TaskType } from "../App";
import Button from "./Button";

type TodolistItemPropsType = {
  title: string;
  tasks: TaskType[];
  todolistId: string;
  removeTask: (todolistId: string, taskId: string) => void;
  removeTodolist: (todolistId: string) => void;
  filterTasks: (filter: FilterType, todolistId: string) => void;
};

const TodolistItem = (props: TodolistItemPropsType) => {
  return (
    <div>
      <h3>
        {props.title}
        <Button
          title="x"
          callback={() => props.removeTodolist(props.todolistId)}
        />
      </h3>
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
        <Button
          title="All"
          callback={() => props.filterTasks("all", props.todolistId)}
        />
        <Button
          title="Active"
          callback={() => props.filterTasks("active", props.todolistId)}
        />
        <Button
          title="Completed"
          callback={() => props.filterTasks("completed", props.todolistId)}
        />
      </div>
    </div>
  );
};
export default TodolistItem;
