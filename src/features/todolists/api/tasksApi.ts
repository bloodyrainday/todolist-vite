import { instance } from "@/common/instance/instance"

import { GetTasksResponse, Task, UpdateTaskModel } from "./tasksApi.types"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => {
        return {
          url: `/todo-lists/${todolistId}/tasks`,
        }
      },

      providesTags: ["Task"],
    }),

    createTask: build.mutation<BaseResponse<{ item: Task }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => {
        return {
          url: `/todo-lists/${todolistId}/tasks`,
          method: "POST",
          body: { title },
        }
      },

      invalidatesTags: ["Task"],
    }),

    deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => {
        return {
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
          method: "DELETE",
        }
      },

      invalidatesTags: ["Task"],
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

      invalidatesTags: ["Task"],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<BaseResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
}
