import { v1 } from "uuid";
import { TaskStorageType } from "../App";
import { AddTodolistAC, RemoveTodolistAC } from "./todolist-reducer";
import { createAction, createReducer } from "@reduxjs/toolkit";

// export type RemoveTaskActionType = {
//   type: "REMOVE-TASK";
//   todolistId: string;
//   taskId: string;
// };

// export type AddTaskActionType = {
//   type: "ADD-TASK";
//   todolistId: string;
//   title: string;
// };

// export type ChangeTaskTitleActionType = {
//   type: "CHANGE-TASK-TITLE";
//   todolistId: string;
//   taskId: string;
//   title: string;
// };

// export type ChangeTaskStatusActionType = {
//   type: "CHANGE-TASK-STATUS";
//   todolistId: string;
//   taskId: string;
//   status: boolean;
// };

// export type ActionsType =
//   | RemoveTaskActionType
//   | AddTaskActionType
//   | ChangeTaskTitleActionType
//   | ChangeTaskStatusActionType
//   | AddTodolistActionType
//   | RemoveTodolistActionType;

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

// export const taskReducer = (
//   state: TaskStorageType = initialState,
//   action: ActionsType
// ): TaskStorageType => {
//   switch (action.type) {
//     case "REMOVE-TASK":
//       return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].filter(
//           (s) => s.id !== action.taskId
//         ),
//       };
//     case "ADD-TASK":
//       return {
//         ...state,
//         [action.todolistId]: [
//           { id: v1(), title: action.title, isDone: false },
//           ...state[action.todolistId],
//         ],
//       };
//     case "CHANGE-TASK-TITLE":
//       return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].map((s) =>
//           s.id === action.taskId ? { ...s, title: action.title } : s
//         ),
//       };
//     case "CHANGE-TASK-STATUS":
//       return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].map((s) =>
//           s.id === action.taskId ? { ...s, isDone: action.status } : s
//         ),
//       };
//     case "ADD-TODOLIST":
//       return {
//         [action.id]: [],
//         ...state,
//       };
//     case "REMOVE-TODOLIST":
//       const copyState = { ...state };
//       delete copyState[action.id];
//       return copyState;
//     default:
//       return state;
//   }
// };

// export const RemoveTaskAC = (
//   todolistId: string,
//   taskId: string
// ): RemoveTaskActionType => {
//   return { type: "REMOVE-TASK", todolistId, taskId };
// };

// export const AddTaskAC = (
//   todolistId: string,
//   title: string
// ): AddTaskActionType => {
//   return { type: "ADD-TASK", todolistId, title };
// };

// export const ChangeTaskTitleAC = (
//   todolistId: string,
//   taskId: string,
//   title: string
// ): ChangeTaskTitleActionType => {
//   return { type: "CHANGE-TASK-TITLE", todolistId, taskId, title };
// };

// export const ChangeTaskStatusAC = (
//   todolistId: string,
//   taskId: string,
//   status: boolean
// ): ChangeTaskStatusActionType => {
//   return { type: "CHANGE-TASK-STATUS", todolistId, taskId, status };
// };
