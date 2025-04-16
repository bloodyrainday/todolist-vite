import "./App.css"
import { CssBaseline } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { ThemeProvider } from "@emotion/react"
import { getTheme } from "../common/theme/theme"
import { Header } from "@/common/components/Header/Header"
import { Main } from "./Main"
import { selectThemeMode } from "./app-slice"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar"
import { Routing } from "@/common/routing/Routing"

function AppWithRedux() {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
export default AppWithRedux
