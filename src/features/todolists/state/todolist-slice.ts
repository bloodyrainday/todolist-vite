import { createSlice, nanoid } from "@reduxjs/toolkit"

export type FilterType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterType
}

const todolistSlice = createSlice({
  name: "todolists",
  initialState: [] as TodolistType[],
  reducers: (create) => ({
    RemoveTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((s) => s.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    ChangeTodolistTitleAC: create.reducer<{
      id: string
      title: string
    }>((state, action) => {
      const todolist = state.find((s) => s.id === action.payload.id)
      if (todolist) {
        todolist.title = action.payload.title
      }
    }),
    ChangeTodolistFilterAC: create.reducer<{
      id: string
      filter: FilterType
    }>((state, action) => {
      const todolist = state.find((s) => s.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    AddTodolistAC: create.preparedReducer(
      (title: string) => {
        const id = nanoid()
        return {
          payload: { id, title },
        }
      },
      (state, action) => {
        state.unshift({
          ...action.payload,
          filter: "all",
        })
      },
    ),
  }),
})

export const todolistReducer = todolistSlice.reducer
export const { RemoveTodolistAC, ChangeTodolistTitleAC, ChangeTodolistFilterAC, AddTodolistAC } = todolistSlice.actions
