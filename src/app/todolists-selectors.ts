import { TodolistType } from "./AppWithRedux";
import { AppRootState } from "../state/store";

export const selectTodolists = (state: AppRootState): TodolistType[] =>
  state.todolists;
