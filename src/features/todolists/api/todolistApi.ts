import { instance } from "@/common/instance/instance"
import { Todolist, TodolistType } from "./todolistApi.types"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi"

export const todolistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Типизация аргументов (<возвращаемый тип, тип query аргументов (`QueryArg`)>)
    // `query` по умолчанию создает запрос `get` и указание метода необязательно
    getTodolists: build.query<TodolistType[], void>({
      query: () => "todo-lists",
      transformResponse: (todolists: Todolist[]): TodolistType[] => {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),

    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => {
        return { url: "todo-lists", method: "POST", body: { title } }
      },
      invalidatesTags: ["Todolist"],
    }),

    deleteTodolist: build.mutation<BaseResponse, string>({
      query: (id) => {
        return { url: `todo-lists/${id}`, method: "DELETE" }
      },
      invalidatesTags: ["Todolist"],
    }),

    changeTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => {
        return { url: `todo-lists/${id}`, method: "PUT", body: { title } }
      },
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistApi

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
