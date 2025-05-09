import { AUTH_TOKEN } from "@/common/constants"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setError } from "./app-slice"
import { isErrorWithMessage } from "@/common/utils"

export const baseApi = createApi({
  reducerPath: "todolistApi",
  tagTypes: ["Todolist", "Task"],
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", import.meta.env.VITE_API_KEY)
        headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
      },
    })(args, api, extraOptions)

    let error = "Some error occurred"

    if (result.error) {
      switch (result.error.status) {
        case "FETCH_ERROR":
        case "PARSING_ERROR":
        case "CUSTOM_ERROR":
          error = result.error.error
          break
        case 403:
          error = "403 Forbidden Error. Check API-KEY"
          break
        case 400:
        case 500:
          if (isErrorWithMessage(result.error.data)) {
            error = result.error.data.message
          } else {
            error = JSON.stringify(result.error.data)
          }
          break
        default:
          error = JSON.stringify(result.error)
          break
      }
      api.dispatch(setError({ error }))
    }

    return result
  },
  endpoints: () => ({}),
})
