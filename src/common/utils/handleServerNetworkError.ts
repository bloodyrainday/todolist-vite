import { setError, setStatus } from "@/app/app-slice"
import type { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage = "some error occurred"

  if (axios.isAxiosError(error)) {
    errorMessage = error.message
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else {
    errorMessage = JSON.stringify(error)
  }
  dispatch(setError({ error: errorMessage }))
  dispatch(setStatus({ status: "failed" }))
}
