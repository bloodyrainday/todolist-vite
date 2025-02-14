import { v1 } from "uuid";
import { TaskStorageType } from "../App";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  todolistId1,
  todolistId2,
} from "./todolist-reducer";

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

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todolistId: string;
  taskId: string;
  status: boolean;
};

export type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskTitleActionType
  | ChangeTaskStatusActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TaskStorageType = {
  [todolistId1]: [
    {
      id: v1(),
      title: "HTML&CSS",
      isDone: true,
    },
    {
      id: v1(),
      title: "JS",
      isDone: false,
    },
    {
      id: v1(),
      title: "React",
      isDone: true,
    },
  ],
  [todolistId2]: [
    {
      id: v1(),
      title: "milk",
      isDone: false,
    },
    {
      id: v1(),
      title: "meat",
      isDone: false,
    },
    {
      id: v1(),
      title: "bread",
      isDone: true,
    },
  ],
};

export const taskReducer = (
  state: TaskStorageType = initialState,
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
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((s) =>
          s.id === action.taskId ? { ...s, isDone: action.status } : s
        ),
      };
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.id]: [],
      };
    case "REMOVE-TODOLIST":
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    default:
      return state;
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

export const ChangeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  status: boolean
): ChangeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", todolistId, taskId, status };
};
