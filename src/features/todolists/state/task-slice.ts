import { createAppSlice } from "@/common/utils"
import { createTodolistTC, deleteTodolistTC } from "./todolist-slice"
import { nanoid } from "@reduxjs/toolkit"
import { tasksApi } from "../api/tasksApi"
import { Task } from "../api/tasksApi.types"
import { TaskPriority, TaskStatus } from "@/common/enums"

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
    RemoveTaskAC: create.reducer<{
      todolistId: string
      taskId: string
    }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex((s) => s.id === action.payload.taskId)
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1)
      }
    }),

    AddTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      state[action.payload.todolistId].unshift({
        id: nanoid(),
        title: action.payload.title,
        status: TaskStatus.New,
        todoListId: action.payload.todolistId,
        deadline: "",
        order: 1,
        startDate: "",
        description: "",
        priority: TaskPriority.Low,
        addedDate: "",
      })
    }),

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

    ChangeTaskStatusAC: create.reducer<{
      todolistId: string
      taskId: string
      status: boolean
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((s) => s.id === action.payload.taskId)
      if (task) {
        task.status = action.payload.status ? TaskStatus.Completed : TaskStatus.New
      }
    }),

    //async actions
    fetchTasks: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          const res = await tasksApi.getTasks(todolistId)
          console.log("tasks", res.data.items)
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
export const { RemoveTaskAC, AddTaskAC, ChangeTaskTitleAC, ChangeTaskStatusAC, fetchTasks } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
