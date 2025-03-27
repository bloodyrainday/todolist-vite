import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  themeMode: "light" as ThemeMode,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: (create) => {
    return {
      changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
        state.themeMode = action.payload.themeMode
      }),
    }
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
  },
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC } = appSlice.actions
export const { selectThemeMode } = appSlice.selectors

export type ThemeMode = "dark" | "light"
