import { v1 } from "uuid";
import { FilterType, TaskStorageType, TodolistType } from "../App";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

export const taskReducer = (
  state: TaskStorageType,
  action: RemoveTaskActionType
): TaskStorageType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (s) => s.id !== action.taskId
        ),
      };

    default:
      throw new Error("I dont understand this action type");
  }
};

export const RemoveTasktAC = (
  todolistId: string,
  taskId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", todolistId, taskId };
};
