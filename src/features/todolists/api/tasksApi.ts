import { instance } from "@/common/instance/instance"

import { Task } from "./tasksApi.types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<Task>(`/todo-lists/${todolistId}/tasks`)
  },
}
