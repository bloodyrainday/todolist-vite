import { createAsyncThunk } from "@reduxjs/toolkit"
import { Todolist } from "../api/todolistApi.types"
import { todolistApi } from "../api/todolistApi"
import { createAppSlice } from "@/common/utils"
import { setStatus } from "@/app/app-slice"

export type FilterType = "all" | "active" | "completed"

export type TodolistType = Todolist & {
  filter: FilterType
}

const todolistSlice = createAppSlice({
  name: "todolists",
  initialState: [] as TodolistType[],
  reducers: (create) => ({
    //actions
    ChangeTodolistFilterAC: create.reducer<{
      id: string
      filter: FilterType
    }>((state, action) => {
      const todolist = state.find((s) => s.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    //async actions
    fetchTodolists: create.asyncThunk(
      async (_arg, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setStatus({ status: "loading" }))
          //await new Promise((res) => setTimeout(res, 2000))
          const res = await todolistApi.getTodolists()
          return { todolists: res.data }
        } catch (err) {
          return rejectWithValue(null)
        } finally {
          dispatch(setStatus({ status: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((tl) => {
            state.push({ ...tl, filter: "all" })
          })
        },
      },
    ),
    createTodolist: create.asyncThunk(
      async (title: string, { rejectWithValue }) => {
        try {
          const res = await todolistApi.createTodolist(title)
          return { todolist: res.data.data.item }
        } catch (err) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload.todolist, filter: "all" })
        },
      },
    ),
  }),

  extraReducers: (builder) => {
    builder
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const todolist = state.find((s) => s.id === action.payload.id)
        if (todolist) {
          todolist.title = action.payload.title
        }
      })
      // .addCase(createTodolistTC.fulfilled, (state, action) => {
      //   state.unshift({
      //     ...action.payload,
      //     filter: "all",
      //     addedDate: "",
      //     order: 0,
      //   })
      // })
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

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistSlice.name}/changeTodolistTitleTC`,
  async (args: { id: string; title: string }, { rejectWithValue }) => {
    try {
      await todolistApi.changeTodolistTitle(args.id, args.title)
      return args
    } catch (err) {
      return rejectWithValue(null)
    }
  },
)

// export const createTodolistTC = createAsyncThunk(
//   `${todolistSlice.name}/createTodolistTC `,
//   async (title: string, { rejectWithValue }) => {
//     try {
//       // const { dispatch } = thunkApi

//       const res = await todolistApi.createTodolist(title)
//       //   dispatch(setTodolistsAC({ todolists: res.data }))
//       return { id: res.data.data.item.id, title: res.data.data.item.title }
//     } catch (err) {
//       return rejectWithValue(null)
//     }
//   },
// )

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
export const { ChangeTodolistFilterAC, fetchTodolists, createTodolist } = todolistSlice.actions
export const { selectTodolists } = todolistSlice.selectors
