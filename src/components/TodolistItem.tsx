import React, { ChangeEvent, useState } from "react";
import { FilterType, TaskType } from "../App";
import Button from "./Button";

type TodolistItemPropsType = {
  title: string;
  tasks: TaskType[];
  todolistId: string;
  removeTask: (todolistId: string, taskId: string) => void;
  removeTodolist: (todolistId: string) => void;
  filterTasks: (filter: FilterType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
};

const TodolistItem = (props: TodolistItemPropsType) => {
  const [inputValue, setInputValue] = useState<string>("");

  const onChangeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };
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
        <input value={inputValue} onChange={onChangeInputValueHandler} />
        <Button
          title="+"
          callback={() => props.addTask(inputValue, props.todolistId)}
        />
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
