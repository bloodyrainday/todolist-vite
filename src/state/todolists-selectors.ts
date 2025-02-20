import { TodolistType } from "../AppWithRedux";
import { AppRootState } from "./store";

export const selectTodolists = (state: AppRootState): TodolistType[] =>
  state.todolists;
