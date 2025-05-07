import { RequestStatus } from "@/common/types"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as string | null,
  isLoggedIn: false as boolean,
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
  }),
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        return action.type.endsWith("/pending")
      },
      (state, action) => {},
    )
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC, setStatus, setError, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, selectStatus, selectError, selectIsLoggedIn } = appSlice.selectors

export type ThemeMode = "dark" | "light"
