export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type Task = {
  error: string
  totalCount: number
  items: TaskItem[]
}

export type TaskItem = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
