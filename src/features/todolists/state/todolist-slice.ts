import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { Todolist } from "../api/todolistApi.types"
import { todolistApi } from "../api/todolistApi"

export type FilterType = "all" | "active" | "completed"

export type TodolistType = Todolist & {
  filter: FilterType
}

const todolistSlice = createSlice({
  name: "todolists",
  initialState: [] as TodolistType[],
  reducers: (create) => ({
    // setTodolistsAC: create.reducer<{ todolists: Todolist[] }>((state, action) => {
    //   action.payload.todolists.forEach((tl) => {
    //     state.push({ ...tl, filter: "all" })
    //   })

    // }),
    RemoveTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((s) => s.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    // ChangeTodolistTitleAC: create.reducer<{
    //   id: string
    //   title: string
    // }>((state, action) => {
    //   const todolist = state.find((s) => s.id === action.payload.id)
    //   if (todolist) {
    //     todolist.title = action.payload.title
    //   }
    // }),
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
          addedDate: "",
          order: 0,
        })
      },
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        action.payload?.todolists.forEach((tl) => {
          state.push({ ...tl, filter: "all" })
        })
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const todolist = state.find((s) => s.id === action.payload.id)
        if (todolist) {
          todolist.title = action.payload.title
        }
      })
  },
})

export const fetchTodolistsTC = createAsyncThunk(
  `${todolistSlice.name}/fetchTodolistsTC`,
  async (_arg, { rejectWithValue }) => {
    try {
      // const { dispatch } = thunkApi

      const res = await todolistApi.getTodolists()
      //   dispatch(setTodolistsAC({ todolists: res.data }))
      return { todolists: res.data }
    } catch (err) {
      return rejectWithValue(null)
    }
  },
)

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistSlice.name}/changeTodolistTitleTC`,
  async (args: { id: string; title: string }, { rejectWithValue }) => {
    try {
      // const { dispatch } = thunkApi

      await todolistApi.changeTodolistTitle(args.id, args.title)
      //   dispatch(setTodolistsAC({ todolists: res.data }))
      return args
    } catch (err) {
      return rejectWithValue(null)
    }
  },
)

export const todolistReducer = todolistSlice.reducer
export const { RemoveTodolistAC, ChangeTodolistFilterAC, AddTodolistAC } = todolistSlice.actions
