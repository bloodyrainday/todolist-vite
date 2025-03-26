import { v1 } from "uuid"
import { createAction, createReducer, createSlice, nanoid } from "@reduxjs/toolkit"

export type FilterType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterType
}

const todolistSlice = createSlice({
  name: "todolist",
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

//export const RemoveTodolistAC = createAction<{ id: string }>("todolists/removeTodolist")

// export const AddTodolistAC = createAction("todolists/addTodolist", (title: string) => {
//   return {
//     payload: {
//       title,
//       id: v1(),
//     },
//   }
// })

// export const ChangeTodolistFilterAC = createAction<{
//   id: string
//   filter: FilterType
// }>("todolists/changeTodolistFilter")

// export const ChangeTodolistTitleAC = createAction<{
//   id: string
//   title: string
// }>("todolists/changeTodolistTitle")

// const initialState: TodolistType[] = []

// export const _todolistReducer = createReducer(initialState, (builder) => {
//   builder.addCase(AddTodolistAC, (state, action) => {
//     state.unshift({
//       ...action.payload,
//       filter: "all",
//     })
//   })
// })

export const todolistReducer = todolistSlice.reducer
export const { RemoveTodolistAC, ChangeTodolistTitleAC, ChangeTodolistFilterAC, AddTodolistAC } = todolistSlice.actions
