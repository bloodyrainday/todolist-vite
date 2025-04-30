import { instance } from "@/common/instance/instance"
import { Todolist, TodolistType } from "./todolistApi.types"
import { BaseResponse } from "@/common/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"

export const todolistApi = createApi({
  reducerPath: "todolistApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers: any) => {
      headers.set("API-KEY", import.meta.env.VITE_API_KEY)
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
  }),

  endpoints: (build) => ({
    // Типизация аргументов (<возвращаемый тип, тип query аргументов (`QueryArg`)>)
    // `query` по умолчанию создает запрос `get` и указание метода необязательно
    getTodolists: build.query<TodolistType[], void>({
      query: () => "todo-lists",
      transformResponse: (todolists: Todolist[]): TodolistType[] => {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
    }),

    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => {
        return { url: "todo-lists", method: "POST", body: { title } }
      },
    }),

    deleteTodolist: build.mutation<BaseResponse, string>({
      query: (id) => {
        return { url: `todo-lists/${id}`, method: "DELETE", body: { id } }
      },
    }),
  }),
})

export const { useGetTodolistsQuery, useCreateTodolistMutation, useDeleteTodolistMutation } = todolistApi

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
