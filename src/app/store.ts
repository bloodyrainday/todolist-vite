import { todolistReducer, todolistSlice } from "../features/todolists/state/todolist-slice"
import { tasksReducer, tasksSlice } from "../features/todolists/state/task-slice"
import { appReducer, appSlice } from "@/app/app-slice"
import { configureStore } from "@reduxjs/toolkit"
import { authReducer, authSlice } from "@/features/auth/model/auth-slice"
import { todolistApi } from "@/features/todolists/api/todolistApi"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import { baseApi } from "./baseApi"

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    [todolistSlice.name]: todolistReducer,
    [tasksSlice.name]: tasksReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistApi.middleware),
})

setupListeners(store.dispatch)

// @ts-ignore
window.store = store
