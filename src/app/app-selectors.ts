import { AppRootState } from "@/features/todolists/state/store"
import { ThemeMode } from "./app-slice"

export const selectThemeMode = (state: AppRootState): ThemeMode => state.themeMode.themeMode
