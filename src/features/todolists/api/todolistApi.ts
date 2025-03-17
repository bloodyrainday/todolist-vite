import { instance } from "@/common/instance/instance"
import { Todolist } from "./todolistApi.types"
import { BaseResponse } from "@/common/types"

export const todolistApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists")
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", {
      title,
    })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
  changeTodolistTitle(id: string, title: string) {
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },
}

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<{}>(`/todo-lists/${todolistId}/tasks`)
  },
}
