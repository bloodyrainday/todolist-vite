import { v1 } from "uuid"
import { createAction, createReducer } from "@reduxjs/toolkit"

export type FilterType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterType
}

export const RemoveTodolistAC = createAction<{ id: string }>("todolists/removeTodolist")

export const AddTodolistAC = createAction("todolists/addTodolist", (title: string) => {
  return {
    payload: {
      title,
      id: v1(),
    },
  }
})

export const ChangeTodolistFilterAC = createAction<{
  id: string
  filter: FilterType
}>("todolists/changeTodolistFilter")

export const ChangeTodolistTitleAC = createAction<{
  id: string
  title: string
}>("todolists/changeTodolistTitle")

const initialState: TodolistType[] = []

export const todolistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(RemoveTodolistAC, (state, action) => {
      const index = state.findIndex((s) => s.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    })
    .addCase(AddTodolistAC, (state, action) => {
      console.log(state)
      state.unshift({
        ...action.payload,
        filter: "all",
      })
    })
    .addCase(ChangeTodolistFilterAC, (state, action) => {
      const todolist = state.find((s) => s.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    })
    .addCase(ChangeTodolistTitleAC, (state, action) => {
      const todolist = state.find((s) => s.id === action.payload.id)
      if (todolist) {
        todolist.title = action.payload.title
      }
    })
})
