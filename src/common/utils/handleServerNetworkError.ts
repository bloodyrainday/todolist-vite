import { setError, setStatus } from "@/app/app-slice"
import type { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"
import { z } from "zod"

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage = "some error occurred"

  switch (true) {
    case axios.isAxiosError(error):
      errorMessage = error.response?.data?.message || error.message
      break

    case error instanceof z.ZodError:
      console.table(error.issues)
      errorMessage = "Zod error. Смотри консоль"
      break

    case error instanceof Error:
      errorMessage = `Native error: ${error.message}`
      break

    default:
      errorMessage = JSON.stringify(error)
  }

  dispatch(setError({ error: errorMessage }))
  dispatch(setStatus({ status: "failed" }))
}
