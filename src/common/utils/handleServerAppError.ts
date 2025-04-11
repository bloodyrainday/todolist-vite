import { setError, setStatus } from "@/app/app-slice"
import type { BaseResponse } from "@/common/types"
import type { Dispatch } from "@reduxjs/toolkit"

// BaseResponse<{
//     item: Task;
// }>

// BaseResponse<{
//     item: Todolist;
// }>

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  dispatch(setError({ error: data.messages.length ? data.messages[0] : "some error occured" }))
  dispatch(setStatus({ status: "failed" }))
}
