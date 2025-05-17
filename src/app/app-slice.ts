import { RequestStatus } from "@/common/types"
import { tasksApi } from "@/features/todolists/api/tasksApi"
import { todolistApi } from "@/features/todolists/api/todolistApi"
import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as string | null,
  isLoggedIn: false as boolean,
  captchaUrl: null as string | null,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setCaptchaUrl: create.reducer<{ captchaUrl: null | string }>((state, action) => {
      state.captchaUrl = action.payload.captchaUrl
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        if (
          todolistApi.endpoints.getTodolists.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
        ) {
          return
        }
        state.status = "loading"
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectCaptchaUrl: (state) => state.captchaUrl,
  },
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC, setStatus, setError, setIsLoggedIn, setCaptchaUrl } = appSlice.actions
export const { selectThemeMode, selectStatus, selectError, selectIsLoggedIn, selectCaptchaUrl } = appSlice.selectors

export type ThemeMode = "dark" | "light"
