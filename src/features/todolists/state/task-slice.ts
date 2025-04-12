import { createAppSlice, handleServerAppError } from "@/common/utils"
import { changeTodolistEntityStatusAC, createTodolist, deleteTodolist } from "./todolist-slice"
import { tasksApi } from "../api/tasksApi"
import { Task, UpdateTaskModel } from "../api/tasksApi.types"
import { AppRootState } from "../../../app/store"
import { setError, setStatus } from "@/app/app-slice"
import { ResultCode } from "@/common/enums"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError"

// export type TaskType = {
//   id: string
//   title: string
//   isDone: boolean
// }

export type TaskStorageType = {
  [key: string]: Task[]
}

const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TaskStorageType,
  reducers: (create) => ({
    //actions

    // RemoveTaskAC: create.reducer<{
    //   todolistId: string
    //   taskId: string
    // }>((state, action) => {
    //   const index = state[action.payload.todolistId].findIndex((s) => s.id === action.payload.taskId)
    //   if (index !== -1) {
    //     state[action.payload.todolistId].splice(index, 1)
    //   }
    // }),

    // AddTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
    //   state[action.payload.todolistId].unshift({
    //     id: nanoid(),
    //     title: action.payload.title,
    //     status: TaskStatus.New,
    //     todoListId: action.payload.todolistId,
    //     deadline: "",
    //     order: 1,
    //     startDate: "",
    //     description: "",
    //     priority: TaskPriority.Low,
    //     addedDate: "",
    //   })
    // }),

    // ChangeTaskTitleAC: create.reducer<{
    //   todolistId: string
    //   taskId: string
    //   title: string
    // }>((state, action) => {
    //   const task = state[action.payload.todolistId].find((s) => s.id === action.payload.taskId)
    //   if (task) {
    //     task.title = action.payload.title
    //   }
    // }),

    // ChangeTaskStatusAC: create.reducer<{
    //   todolistId: string
    //   taskId: string
    //   status: boolean
    // }>((state, action) => {
    //   const task = state[action.payload.todolistId].find((s) => s.id === action.payload.taskId)
    //   if (task) {
    //     task.status = action.payload.status ? TaskStatus.Completed : TaskStatus.New
    //   }
    // }),

    //async actions
    fetchTasks: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setStatus({ status: "loading" }))
          const res = await tasksApi.getTasks(todolistId)
          dispatch(setStatus({ status: "succeeded" }))
          return { tasks: res.data.items, todolistId }
        } catch (err) {
          handleServerNetworkError(err, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    createTask: create.asyncThunk(
      async (args: { todolistId: string; title: string }, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setStatus({ status: "loading" }))
          const res = await tasksApi.createTask(args.todolistId, args.title)
          //resultCode handling
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setStatus({ status: "succeeded" }))
            return { task: res.data.data.item }
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
          state[action.payload.task.todoListId].unshift(action.payload.task)
        },
      },
    ),
    deleteTask: create.asyncThunk(
      async (args: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setStatus({ status: "loading" }))
          const res = await tasksApi.deleteTask(args.todolistId, args.taskId)
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
          const index = state[action.payload.todolistId].findIndex((s) => s.id === action.payload.taskId)
          if (index !== -1) {
            state[action.payload.todolistId].splice(index, 1)
          }
        },
      },
    ),
    updateTask: create.asyncThunk(
      async (
        args: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
        { dispatch, rejectWithValue, getState },
      ) => {
        const { todolistId, taskId, domainModel } = args
        try {
          const state = getState() as AppRootState
          const task = state.tasks[todolistId].find((t) => t.id === taskId)
          dispatch(setStatus({ status: "loading" }))

          if (task) {
            const model: UpdateTaskModel = {
              title: task.title,
              description: task.description,
              status: task.status,
              priority: task.priority,
              startDate: task.startDate,
              deadline: task.deadline,
            }

            const res = await tasksApi.updateTask(task.todoListId, task.id, { ...model, ...domainModel })

            //resultCode handling

            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setStatus({ status: "succeeded" }))
              return { task: res.data.data.item }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } else {
            return rejectWithValue(null)
          }
        } catch (err) {
          handleServerNetworkError(err, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          let index = state[action.payload.task.todoListId].findIndex((s) => s.id === action.payload.task.id)

          if (index !== -1) {
            state[action.payload.task.todoListId][index] = action.payload.task
          }
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { createTask, fetchTasks, deleteTask, updateTask } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
