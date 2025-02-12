import { TodolistType } from "../App";

export type RemoveTodolistActionType = {
  type: string;
  id: string;
};

export const todolistReducer = (
  state: TodolistType[],
  action: RemoveTodolistActionType
) => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((s) => s.id !== action.id);
    default:
      throw new Error("I dont understand this action type");
  }
};

export const RemoveTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", id };
};
