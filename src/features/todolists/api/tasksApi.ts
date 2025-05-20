import { GetTasksResponse, getTasksSchema, Task, UpdateTaskModel } from "./tasksApi.types"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi"
import { PAGE_SIZE } from "@/common/constants"
import { z } from "zod"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
      query: ({ todolistId, params }) => {
        return {
          url: `/todo-lists/${todolistId}/tasks`,
          params: { ...params, count: PAGE_SIZE },
        }
      },
      transformResponse: (res: GetTasksResponse) => {
        try {
          getTasksSchema.array().parse(res)
        } catch (err) {
          if (err instanceof z.ZodError) {
            console.table(err.issues)
            alert("Zod Error. смотри консоль")
          }
        }

        return res
      },
      providesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),

    createTask: build.mutation<BaseResponse<{ item: Task }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => {
        return {
          url: `/todo-lists/${todolistId}/tasks`,
          method: "POST",
          body: { title },
        }
      },

      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),

    deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => {
        return {
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
          method: "DELETE",
        }
      },

      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),

    updateTask: build.mutation<
      BaseResponse<{ item: Task }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => {
        return {
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
          method: "PUT",
          body: model,
        }
      },
      async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks")

        let patchResults: any[] = []
        cachedArgsForQuery.forEach(({ params }) => {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData("getTasks", { todolistId, params: { page: params.page } }, (state) => {
                const index = state.items.findIndex((task) => task.id === taskId)
                if (index !== -1) {
                  state.items[index] = { ...state.items[index], ...model }
                }
              }),
            ),
          )
        })
        try {
          await queryFulfilled
        } catch {
          patchResults.forEach((patchResult) => {
            patchResult.undo()
          })
        }
      },
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi

// export const _tasksApi = {
//   getTasks(todolistId: string) {
//     return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
//   },
//   createTask(todolistId: string, title: string) {
//     return instance.post<BaseResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks`, { title })
//   },
//   updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
//     return instance.put<BaseResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
//   },
//   deleteTask(todolistId: string, taskId: string) {
//     return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
//   },
// }
