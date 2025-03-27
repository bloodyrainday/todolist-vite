import { createTodolistTC, deleteTodolistTC } from "./todolist-slice"
import { createSlice, nanoid } from "@reduxjs/toolkit"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TaskStorageType = {
  [key: string]: TaskType[]
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TaskStorageType,
  reducers: (create) => ({
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
        isDone: false,
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
        task.isDone = action.payload.status
      }
    }),
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
    selectsTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { RemoveTaskAC, AddTaskAC, ChangeTaskTitleAC, ChangeTaskStatusAC } = tasksSlice.actions
export const { selectsTasks } = tasksSlice.selectors
