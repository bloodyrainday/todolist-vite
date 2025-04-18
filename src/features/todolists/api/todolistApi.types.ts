import { RequestStatus } from "@/common/types"
import { Z } from "vitest/dist/chunks/reporters.D7Jzd9GS.js"
import { z } from "zod"

// export type Todolist = {
//   id: string
//   title: string
//   addedDate: string
//   order: number
// }
export type FilterType = "all" | "active" | "completed"

export const todolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.string(),
  order: z.string(),
})

export type Todolist = z.infer<typeof todolistSchema>

export type TodolistType = Todolist & {
  filter: FilterType
  entityStatus: RequestStatus
}
