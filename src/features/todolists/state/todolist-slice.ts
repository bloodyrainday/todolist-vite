import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
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
    ChangeTodolistFilterAC: create.reducer<{
      id: string
      filter: FilterType
    }>((state, action) => {
      const todolist = state.find((s) => s.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
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
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload,
          filter: "all",
          addedDate: "",
          order: 0,
        })
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((s) => s.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
  },
  selectors: {
    selectTodolists: (state) => state,
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

export const createTodolistTC = createAsyncThunk(
  `${todolistSlice.name}/createTodolistTC `,
  async (title: string, { rejectWithValue }) => {
    try {
      // const { dispatch } = thunkApi

      const res = await todolistApi.createTodolist(title)
      //   dispatch(setTodolistsAC({ todolists: res.data }))
      return { id: res.data.data.item.id, title: res.data.data.item.title }
    } catch (err) {
      return rejectWithValue(null)
    }
  },
)

export const deleteTodolistTC = createAsyncThunk(
  `${todolistSlice.name}/deleteTodolistTC `,
  async (arg: { id: string }, { rejectWithValue }) => {
    try {
      // const { dispatch } = thunkApi

      await todolistApi.deleteTodolist(arg.id)
      //   dispatch(setTodolistsAC({ todolists: res.data }))
      return arg
    } catch (err) {
      return rejectWithValue(null)
    }
  },
)

export const todolistReducer = todolistSlice.reducer
export const { ChangeTodolistFilterAC } = todolistSlice.actions
export const { selectTodolists } = todolistSlice.selectors
