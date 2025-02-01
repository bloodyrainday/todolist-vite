import React, { ChangeEvent, useState } from "react";
import { FilterType, TaskType } from "../App";
import Button from "./Button";
import "../App.css";
import { AddItemForm } from "./AddItemForm";
import { EditText } from "./EditText";
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
  editTaskTitle: (newTitle: string, todolistId: string, taskId: string) => void;
};
const TodolistItem = (props: TodolistItemPropsType) => {
  const addTask = (title: string) => {
    props.addTask(title, props.todolistId);
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

      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((task: TaskType, i) => {
          const onChangeTaskTitle = (newTitle: string) => {
            props.editTaskTitle(newTitle, props.todolistId, task.id);
          };
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
              <EditText title={task.title} onChange={onChangeTaskTitle} />
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
