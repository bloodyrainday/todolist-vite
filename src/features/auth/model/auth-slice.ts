import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import { Inputs } from "../lib/schemas"
import { authApi } from "../api/authApi"
import { setStatus } from "@/app/app-slice"
import { ResultCode } from "@/common/enums"

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: Inputs, { dispatch, rejectWithValue }) => {
        // логика санки для авторизации
        try {
          dispatch(setStatus({ status: "loading" }))
          const res = await authApi.login(data)

          //resultCode handling
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setStatus({ status: "succeeded" }))
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
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC } = authSlice.actions
export const authReducer = authSlice.reducer
