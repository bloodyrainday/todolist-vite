import { instance } from "@/common"
import { BaseResponse } from "@/common/types"
import { LoginInputs } from "../lib/schemas"
import { baseApi } from "@/app/baseApi"
import { Todolist, TodolistType } from "@/features/todolists/api/todolistApi.types"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
      query: (body) => {
        return { url: "auth/login", method: "POST", body }
      },
    }),

    logout: build.mutation<BaseResponse, void>({
      query: () => {
        return { url: "auth/login", method: "DELETE" }
      },
    }),

    me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => {
        return { url: "auth/me" }
      },
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi

export const _authApi = {
  login(payload: LoginInputs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>("auth/login", payload)
  },
  logout() {
    return instance.delete<BaseResponse>("auth/login")
  },
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me")
  },
}
