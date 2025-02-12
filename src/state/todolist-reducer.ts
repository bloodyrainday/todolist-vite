import { v1 } from "uuid";
import { FilterType, TodolistType } from "../App";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  id: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterType;
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistTitleActionType;

export const todolistReducer = (
  state: TodolistType[],
  action: ActionsType
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((s) => s.id !== action.id);
    case "ADD-TODOLIST":
      return [{ id: action.id, title: action.title, filter: "all" }, ...state];
    case "CHANGE-TODOLIST-FILTER":
      return state.map((s) =>
        s.id === action.id ? { ...s, filter: action.filter } : s
      );
    case "CHANGE-TODOLIST-TITLE":
      return state.map((s) =>
        s.id === action.id ? { ...s, title: action.title } : s
      );
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

export const ChangeTodolistFilterAC = (
  id: string,
  filter: FilterType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id, filter };
};

export const ChangeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id, title };
};
