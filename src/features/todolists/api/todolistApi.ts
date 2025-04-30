import { instance } from "@/common/instance/instance"
import { Todolist } from "./todolistApi.types"
import { BaseResponse } from "@/common/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"

export const todolistApi = createApi({
  reducerPath: "todolistApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  prepareHeaders: (headers) => {
    headers.set("API-KEY", import.meta.env.VITE_API_KEY)
    headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
  },
  endpoints: (build) => ({
    // Типизация аргументов (<возвращаемый тип, тип query аргументов (`QueryArg`)>)
    // `query` по умолчанию создает запрос `get` и указание метода необязательно
    getTodolists: build.query<any[], void>({
      query: () => "todo-lists",
    }),
  }),
})

export const _todolistApi = {
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
