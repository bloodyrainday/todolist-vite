import { setError, setStatus } from "@/app/app-slice"
import type { Dispatch } from "@reduxjs/toolkit"

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setError({ error: error.message }))
  dispatch(setStatus({ status: "failed" }))
}
