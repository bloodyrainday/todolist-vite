import { TaskPriority, TaskStatus } from "@/common/enums/enums"
import { z } from "zod"
export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: Task[]
}

// export type Task = {
//   description: string | null
//   title: string
//   status: TaskStatus
//   priority: TaskPriority
//   startDate: string | null
//   deadline: string | null
//   id: string
//   todoListId: string
//   order: number
//   addedDate: string
// }

export const taskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.string(),
})

export type Task = z.infer<typeof taskSchema>

export const getTasksSchema = z.object({
  error: z.string().nullable(),
  totalCount: z.number().int().nonnegative(),
  items: taskSchema.array(),
})

export type UpdateTaskModel = {
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
