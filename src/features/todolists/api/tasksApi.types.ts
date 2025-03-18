export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: Task[]
}

export type Task = {
  description: string | null
  title: string
  status: number
  priority: number
  startDate: string | null
  deadline: string | null
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModel = {
  title: string
  description: string | null
  status: number
  priority: number
  startDate: string | null
  deadline: string | null
}
