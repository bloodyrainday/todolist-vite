import { Todolist } from "./todolistApi.types"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi"
import { TodolistType } from "../lib/types"

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
      async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todolistApi.util.updateQueryData("getTodolists", undefined, (state) => {
            const index = state.findIndex((todolist) => todolist.id === id)
            if (index !== -1) {
              state.splice(index, 1)
            }

            // const todolist = state.find((todolist) => todolist.id === id)
            // if (todolist) {
            //   todolist.entityStatus = "loading"
            // }
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
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

// export const _todolistApi = {
//   getTodolists() {
//     return instance.get<Todolist[]>("todo-lists")
//   },
//   createTodolist(title: string) {
//     return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", {
//       title,
//     })
//   },
//   deleteTodolist(id: string) {
//     return instance.delete<BaseResponse>(`todo-lists/${id}`)
//   },
//   changeTodolistTitle(id: string, title: string) {
//     return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
//   },
// }
