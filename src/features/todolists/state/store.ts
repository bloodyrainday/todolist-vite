import { combineReducers, createStore } from "redux"
import { todolistReducer } from "./todolist-reducer"
import { tasksReducer } from "./task-reducer."
import { appReducer } from "@/app/app-slice"

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer,
  themeMode: appReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store
