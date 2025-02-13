import { v1 } from "uuid";
import { FilterType, TaskStorageType, TodolistType } from "../App";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  title: string;
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  todolistId: string;
  taskId: string;
  title: string;
};

export type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskTitleActionType;

export const taskReducer = (
  state: TaskStorageType,
  action: ActionsType
): TaskStorageType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (s) => s.id !== action.taskId
        ),
      };
    case "ADD-TASK":
      return {
        ...state,
        [action.todolistId]: [
          { id: v1(), title: action.title, isDone: false },
          ...state[action.todolistId],
        ],
      };
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((s) =>
          s.id === action.taskId ? { ...s, title: action.title } : s
        ),
      };
    default:
      throw new Error("I dont understand this action type");
  }
};

export const RemoveTaskAC = (
  todolistId: string,
  taskId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", todolistId, taskId };
};

export const AddTaskAC = (
  todolistId: string,
  title: string
): AddTaskActionType => {
  return { type: "ADD-TASK", todolistId, title };
};

export const ChangeTaskTitleAC = (
  todolistId: string,
  taskId: string,
  title: string
): ChangeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", todolistId, taskId, title };
};
