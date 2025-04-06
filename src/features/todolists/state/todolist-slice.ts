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
          dispatch(setStatus({ status: "succeeded" }))

          return { todolists: res.data }
        } catch (err) {
          dispatch(setStatus({ status: "failed" }))
          return rejectWithValue(null)
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
      async (arg: { title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setStatus({ status: "loading" }))
          const res = await todolistApi.createTodolist(arg.title)
          dispatch(setStatus({ status: "succeeded" }))
          return { todolist: res.data.data.item }
        } catch (err) {
          dispatch(setStatus({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload.todolist, filter: "all" })
        },
      },
    ),
    deleteTodolist: create.asyncThunk(
      async (arg: { id: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setStatus({ status: "loading" }))
          await todolistApi.deleteTodolist(arg.id)
          dispatch(setStatus({ status: "succeeded" }))
          return arg
        } catch (err) {
          dispatch(setStatus({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((s) => s.id === action.payload.id)
          if (index !== -1) {
            state.splice(index, 1)
          }
        },
      },
    ),
    changeTodolistTitle: create.asyncThunk(
      async (args: { id: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setStatus({ status: "loading" }))
          await todolistApi.changeTodolistTitle(args.id, args.title)
          dispatch(setStatus({ status: "succeeded" }))
          return args
        } catch (err) {
          dispatch(setStatus({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const todolist = state.find((s) => s.id === action.payload.id)
          if (todolist) {
            todolist.title = action.payload.title
          }
        },
      },
    ),
  }),

  // extraReducers: (builder) => {
  //   builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
  //     const todolist = state.find((s) => s.id === action.payload.id)
  //     if (todolist) {
  //       todolist.title = action.payload.title
  //     }
  //   })
  // },
  selectors: {
    selectTodolists: (state) => state,
  },
})

// export const changeTodolistTitleTC = createAsyncThunk(
//   `${todolistSlice.name}/changeTodolistTitleTC`,
//   async (args: { id: string; title: string }, { rejectWithValue }) => {
//     try {
//       await todolistApi.changeTodolistTitle(args.id, args.title)
//       return args
//     } catch (err) {
//       return rejectWithValue(null)
//     }
//   },
// )

export const todolistReducer = todolistSlice.reducer
export const { ChangeTodolistFilterAC, fetchTodolists, createTodolist, deleteTodolist, changeTodolistTitle } =
  todolistSlice.actions
export const { selectTodolists } = todolistSlice.selectors
