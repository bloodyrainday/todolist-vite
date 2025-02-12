import { v1 } from "uuid";
import { TodolistType } from "../App";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  id: string;
};

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType;

export const todolistReducer = (
  state: TodolistType[],
  action: ActionsType
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((s) => s.id !== action.id);
    case "ADD-TODOLIST":
      return [{ id: action.id, title: action.title, filter: "all" }, ...state];
    default:
      throw new Error("I dont understand this action type");
  }
};

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id };
};

export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title, id: v1() };
};
