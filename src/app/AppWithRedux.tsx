import "./App.css"
import { CircularProgress, CssBaseline } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { ThemeProvider } from "@emotion/react"
import { getTheme } from "../common/theme/theme"
import { Header } from "@/common/components/Header/Header"
import { selectThemeMode } from "./app-slice"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar"
import { Routing } from "@/common/routing/Routing"
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/common"
import { initializeAppTC } from "@/features/auth/model/auth-slice"
import styles from "./App.module.css"

function AppWithRedux() {
  const [isInitialized, setIsInitialized] = useState(false)
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }
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
