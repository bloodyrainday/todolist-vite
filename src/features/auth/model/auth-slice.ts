import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import { LoginInputs } from "../lib/schemas"
import { _authApi } from "../api/authApi"
import { setStatus } from "@/app/app-slice"
import { ResultCode } from "@/common/enums"
import { AUTH_TOKEN } from "@/common/constants"

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {},
  reducers: (create) => ({
    initializeAppTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setStatus({ status: "loading" }))
          const res = await _authApi.me()
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setStatus({ status: "succeeded" }))
            return { isLoggedIn: true }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error: any) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          // state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),

    loginTC: create.asyncThunk(
      async (data: LoginInputs, { dispatch, rejectWithValue }) => {
        // логика санки для авторизации
        try {
          dispatch(setStatus({ status: "loading" }))
          const res = await _authApi.login(data)

          //resultCode handling
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setStatus({ status: "succeeded" }))
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            return { isLoggedIn: true }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (err) {
          handleServerNetworkError(err, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          // state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),

    logoutTC: create.asyncThunk(
      async (_arg, { dispatch, rejectWithValue }) => {
        // логика санки для авторизации
        try {
          dispatch(setStatus({ status: "loading" }))
          const res = await _authApi.logout()

          //resultCode handling
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setStatus({ status: "succeeded" }))
            localStorage.removeItem(AUTH_TOKEN)
            return { isLoggedIn: false }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (err) {
          handleServerNetworkError(err, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          // state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
  }),
})

export const { loginTC, logoutTC, initializeAppTC } = authSlice.actions
export const authReducer = authSlice.reducer
