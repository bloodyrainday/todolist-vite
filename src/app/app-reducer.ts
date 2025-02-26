import { createAction, createReducer } from "@reduxjs/toolkit";

const changeThemeModeAC = createAction<{ theme: ThemeMode }>("changeThemeMode");

const initialState = {
  themeMode: "light" as ThemeMode,
};

export const appReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeThemeModeAC, (state, action) => {
    // логика мутабельного изменения стейта при изменении темы
  });
});

export type ThemeMode = "dark" | "light";
