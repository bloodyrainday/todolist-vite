import { combineReducers, createStore } from "redux";
import { todolistReducer } from "./todolist-reducer";
import { taskReducer } from "./task-reducer.";
import { TaskStorageType, TodolistType } from "../AppWithRedux";

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
