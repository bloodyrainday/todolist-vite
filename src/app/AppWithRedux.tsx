import "./App.css"
import { CssBaseline } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { ThemeProvider } from "@emotion/react"
import { selectThemeMode } from "./app-selectors"
import { getTheme } from "../common/theme/theme"
import { Header } from "@/common/components/Header/Header"
import { Main } from "./Main"

function AppWithRedux() {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}
export default AppWithRedux
