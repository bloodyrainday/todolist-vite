import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"

const initialState = {
  themeMode: "light" as ThemeMode,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
})

export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>("changeThemeMode")

export const appReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeThemeModeAC, (state, action) => {
    state.themeMode = action.payload.themeMode
  })
})

export type ThemeMode = "dark" | "light"
