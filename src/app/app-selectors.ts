import { AppRootState } from "@/state/store"
import { ThemeMode } from "./app-reducer"

export const selectThemeMode = (state: AppRootState): ThemeMode => state.themeMode.themeMode
