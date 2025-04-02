export type FieldError = {
  error: string
  field: string
}

export type BaseResponse<D = {}> = {
  data: D
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
