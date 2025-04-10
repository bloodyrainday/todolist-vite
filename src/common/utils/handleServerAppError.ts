import { setError, setStatus } from "@/app/app-slice"
import type { BaseResponse } from "@/common/types"
import type { Dispatch } from "@reduxjs/toolkit"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  // if (data.messages.length) {
  //   dispatch(setError({ error: data.messages[0] }))
  // } else {
  //   dispatch(setError({ error: "Some error occurred" }))
  // }
  // dispatch(setStatus({ status: "failed" }))

  dispatch(setStatus({ status: "failed" }))
  dispatch(setError({ error: data.messages.length ? data.messages[0] : "some error occured" }))
}
