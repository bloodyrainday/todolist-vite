import { Todolist } from "../api/todolistApi.types"
import { todolistApi } from "../api/todolistApi"
import { createAppSlice, handleServerAppError } from "@/common/utils"
import { setError, setStatus } from "@/app/app-slice"
import { RequestStatus } from "@/common/types"
import { ResultCode } from "@/common/enums"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError"

export type FilterType = "all" | "active" | "completed"

export type TodolistType = Todolist & {
  filter: FilterType
  entityStatus: RequestStatus
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

    changeTodolistEntityStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find((s) => s.id === action.payload.id)
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus
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
        } catch (err: any) {
          dispatch(setError({ error: err.message }))
          dispatch(setStatus({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((tl) => {
            state.push({ ...tl, filter: "all", entityStatus: "idle" })
          })
        },
      },
    ),
    createTodolist: create.asyncThunk(
      async (arg: { title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setStatus({ status: "loading" }))
          const res = await todolistApi.createTodolist(arg.title)

          //resultCode handling
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setStatus({ status: "succeeded" }))
            return { todolist: res.data.data.item }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (err) {
          handleServerNetworkError(err, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
        },
      },
    ),
    deleteTodolist: create.asyncThunk(
      async (arg: { id: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setStatus({ status: "loading" }))
          dispatch(changeTodolistEntityStatusAC({ id: arg.id, entityStatus: "loading" }))
          const res = await todolistApi.deleteTodolist(arg.id)

          //resultCode handling

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setStatus({ status: "succeeded" }))
            return arg
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (err) {
          handleServerNetworkError(err, dispatch)
          dispatch(changeTodolistEntityStatusAC({ id: arg.id, entityStatus: "succeeded" }))
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
          const res = await todolistApi.changeTodolistTitle(args.id, args.title)

          //resultCode handling

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setStatus({ status: "succeeded" }))
            return args
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (err) {
          handleServerNetworkError(err, dispatch)
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
export const {
  ChangeTodolistFilterAC,
  changeTodolistEntityStatusAC,
  fetchTodolists,
  createTodolist,
  deleteTodolist,
  changeTodolistTitle,
} = todolistSlice.actions
export const { selectTodolists } = todolistSlice.selectors
