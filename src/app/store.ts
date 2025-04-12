import { combineReducers, createStore } from "redux"
import { todolistReducer } from "../features/todolists/state/todolist-slice"
import { tasksReducer } from "../features/todolists/state/task-slice"
import { appReducer } from "@/app/app-slice"
import { configureStore } from "@reduxjs/toolkit"

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
  },
})

// @ts-ignore
window.store = store
