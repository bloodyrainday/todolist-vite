import React, { ChangeEvent, useState } from "react";
import { TaskFilterType, TaskType } from "../App";
import Button from "./Button";

type TodolistItemPropsType = {
  tasks: TaskType[];
  deleteTask: (id: string) => void;
  setFilter: (filter: TaskFilterType) => void;
  addTask: (title: string) => void;
  checkTask: (id: string, status: boolean) => void;
};

const TodolistItem = (props: TodolistItemPropsType) => {
  const [inputValue, setInputValue] = useState<string>("");

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onAddButtonClickHandler = () => {
    props.addTask(inputValue);

    setInputValue("");
  };
  console.log(inputValue);
  const emptyInput = inputValue.trim() === "";
  const maxTitleLength = inputValue.length > 10;
  return (
    <div>
      <h3>What to learn</h3>
      <div>
        <input onChange={onChangeInputValue} value={inputValue} />
        <Button
          title="+"
          callback={onAddButtonClickHandler}
          disabled={emptyInput || maxTitleLength}
        />
        {emptyInput && <div>please, enter your task name</div>}
        {maxTitleLength && (
          <div style={{ color: "red" }}>
            your task name should not have more than 10 characters
          </div>
        )}
      </div>
      <ul>
        {props.tasks.map((task: TaskType, i) => {
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={(e) =>
                  props.checkTask(task.id, e.currentTarget.checked)
                }
              />{" "}
              <span>{task.title}</span>
              <Button title="x" callback={() => props.deleteTask(task.id)} />
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
