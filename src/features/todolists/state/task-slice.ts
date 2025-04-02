import { createAppSlice } from "@/common/utils"
import { createTodolistTC, deleteTodolistTC } from "./todolist-slice"
import { nanoid } from "@reduxjs/toolkit"
import { tasksApi } from "../api/tasksApi"
import { Task, UpdateTaskModel } from "../api/tasksApi.types"
import { TaskPriority, TaskStatus } from "@/common/enums"
import { RootState } from "@reduxjs/toolkit/query"
import { AppRootState } from "./store"

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

    ChangeTaskTitleAC: create.reducer<{
      todolistId: string
      taskId: string
      title: string
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((s) => s.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    }),

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
      async (todolistId: string, { rejectWithValue }) => {
        try {
          const res = await tasksApi.getTasks(todolistId)
          return { tasks: res.data.items, todolistId }
        } catch (err) {
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
      async (args: { todolistId: string; title: string }, { rejectWithValue }) => {
        try {
          const res = await tasksApi.createTask(args.todolistId, args.title)
          return { task: res.data.data.item, todolistId: args.todolistId }
        } catch (err) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId].unshift(action.payload.task)
        },
      },
    ),
    deleteTask: create.asyncThunk(
      async (args: { todolistId: string; taskId: string }, { rejectWithValue }) => {
        try {
          await tasksApi.deleteTask(args.todolistId, args.taskId)
          return args
        } catch (err) {
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
    changeTaskStatus: create.asyncThunk(
      async (args: { todolistId: string; taskId: string; status: TaskStatus }, { rejectWithValue, getState }) => {
        const { todolistId, taskId, status } = args
        try {
          const state = getState() as AppRootState
          const task = state.tasks[todolistId].find((t) => t.id === taskId)

          if (task) {
            const model: UpdateTaskModel = {
              title: task.title,
              description: task.description,
              status,
              priority: task.priority,
              startDate: task.startDate,
              deadline: task.deadline,
            }
            await tasksApi.updateTask(todolistId, taskId, model)
          } else {
            return rejectWithValue(null)
          }

          return args
        } catch (err) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.todolistId].find((s) => s.id === action.payload.taskId)
          if (task) {
            task.status = action.payload.status
          }
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { createTask, ChangeTaskTitleAC, fetchTasks, deleteTask, changeTaskStatus } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
