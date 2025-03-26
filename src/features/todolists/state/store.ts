import { combineReducers, createStore } from "redux"
import { todolistReducer } from "./todolist-slice"
import { tasksReducer } from "./task-slice"
import { appReducer } from "@/app/app-slice"
import { configureStore } from "@reduxjs/toolkit"

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    todolists: todolistReducer,
    tasks: tasksReducer,
    themeMode: appReducer,
  },
})

// @ts-ignore
window.store = store
