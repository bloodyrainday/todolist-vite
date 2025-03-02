import { v1 } from "uuid";
import { AddTodolistAC, RemoveTodolistAC } from "./todolist-reducer";
import { createAction, createReducer } from "@reduxjs/toolkit";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TaskStorageType = {
  [key: string]: TaskType[];
};

export const RemoveTaskAC = createAction<{
  todolistId: string;
  taskId: string;
}>("tasks/removeTask");

export const AddTaskAC = createAction<{ todolistId: string; title: string }>(
  "tasks/addTask"
);

export const ChangeTaskTitleAC = createAction<{
  todolistId: string;
  taskId: string;
  title: string;
}>("tasks/changeTaskTitle");

export const ChangeTaskStatusAC = createAction<{
  todolistId: string;
  taskId: string;
  status: boolean;
}>("tasks/changeTaskStatus");

const initialState: TaskStorageType = {};

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(RemoveTodolistAC, (state, action) => {
      delete state[action.payload.id];
    })
    .addCase(AddTodolistAC, (state, action) => {
      state[action.payload.id] = [];
    })
    .addCase(RemoveTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        (s) => s.id === action.payload.taskId
      );
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1);
      }
    })
    .addCase(AddTaskAC, (state, action) => {
      state[action.payload.todolistId].unshift({
        id: v1(),
        title: action.payload.title,
        isDone: false,
      });
    })
    .addCase(ChangeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find(
        (s) => s.id === action.payload.taskId
      );
      if (task) {
        task.title = action.payload.title;
      }
    })
    .addCase(ChangeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find(
        (s) => s.id === action.payload.taskId
      );
      if (task) {
        task.isDone = action.payload.status;
      }
    });
});
