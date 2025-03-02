import { TodolistType } from "@/state/todolist-reducer";
import { AppRootState } from "../state/store";

export const selectTodolists = (state: AppRootState): TodolistType[] =>
  state.todolists;
