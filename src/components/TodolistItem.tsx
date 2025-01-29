import React, { ChangeEvent, useState } from "react";
import { FilterType, TaskType } from "../App";
import Button from "./Button";
import "../App.css";
type TodolistItemPropsType = {
  tasks: TaskType[];
  removeTask: (taskId: string, todolistId: string) => void;
  setFilter: (filter: FilterType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  filter: FilterType;
  changeTaskStatus: (
    taskId: string,
    status: boolean,
    todolistId: string
  ) => void;
  todolistId: string;
  removeTodolist: (todolistId: string) => void;
  title: string;
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
      props.addTask(taskTitle, props.todolistId);
      setTaskTitle("");
    } else {
      setError("title is required");
    }
  };
  return (
    <div>
      <h3>
        {props.title}
        <Button
          title="x"
          callback={() => props.removeTodolist(props.todolistId)}
        ></Button>
      </h3>

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
                  props.changeTaskStatus(
                    task.id,
                    e.currentTarget.checked,
                    props.todolistId
                  )
                }
              />{" "}
              <span>{task.title}</span>
              <Button
                title="x"
                callback={() => props.removeTask(task.id, props.todolistId)}
              />
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          className={props.filter === "all" ? "active" : ""}
          title="All"
          callback={() => props.setFilter("all", props.todolistId)}
        />
        <Button
          className={props.filter === "active" ? "active" : ""}
          title="Active"
          callback={() => props.setFilter("active", props.todolistId)}
        />
        <Button
          className={props.filter === "completed" ? "active" : ""}
          title="Completed"
          callback={() => props.setFilter("completed", props.todolistId)}
        />
      </div>
    </div>
  );
};
export default TodolistItem;
