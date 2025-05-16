import { Todolist } from "../../api/todolistApi.types"

export type TodolistType = Todolist & {
  filter: FilterType
  //entityStatus: RequestStatus
}

export type FilterType = "all" | "active" | "completed"
