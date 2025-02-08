import React, { ChangeEvent, useState } from "react";
import { FilterType, TaskType } from "../App";
import Button from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditText } from "./EditText";

type TodolistItemPropsType = {
  title: string;
  tasks: TaskType[];
  todolistId: string;
  filter: FilterType;
  removeTask: (todolistId: string, taskId: string) => void;
  removeTodolist: (todolistId: string) => void;
  filterTasks: (filter: FilterType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  editTaskTitle: (title: string, todolistId: string, taskId: string) => void;
  editTodolistTitle: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    status: boolean,
    todolistId: string,
    taskId: string
  ) => void;
};

const TodolistItem = (props: TodolistItemPropsType) => {
  const onAddItemHandler = (newTitle: string) => {
    props.addTask(newTitle, props.todolistId);
  };

  // const onChangeTaskTitleHandler = (newTitle: string) => {
  //   props.editTaskTitle(newTitle, props.todolistId);
  // };
  return (
    <div>
      <EditText
        title={props.title}
        callback={(newTitle) =>
          props.editTodolistTitle(newTitle, props.todolistId)
        }
      />
      <Button
        variant="contained"
        title="x"
        callback={() => props.removeTodolist(props.todolistId)}
      />

      <AddItemForm addItem={onAddItemHandler} />

      <ul>
        {props.tasks.map((t) => {
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(
              e.currentTarget.checked,
              props.todolistId,
              t.id
            );
          };
          return (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditText
                title={t.title}
                callback={(newTitle) =>
                  props.editTaskTitle(newTitle, props.todolistId, t.id)
                }
              />
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
          className={props.filter === "all" ? "active" : ""}
          callback={() => props.filterTasks("all", props.todolistId)}
        />
        <Button
          title="Active"
          className={props.filter === "active" ? "active" : ""}
          callback={() => props.filterTasks("active", props.todolistId)}
        />
        <Button
          title="Completed"
          className={props.filter === "completed" ? "active" : ""}
          callback={() => props.filterTasks("completed", props.todolistId)}
        />
      </div>
    </div>
  );
};
export default TodolistItem;
