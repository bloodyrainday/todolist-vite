import { changeThemeModeAC, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedIn } from "@/app/app-slice"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { AppBar, Box, Container, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { NavButton } from "../NavButton/NavButton"
import { containerSx } from "@/common/styles/container.styles"
import { useLogoutMutation } from "@/features/auth/api/authApi"
import { AUTH_TOKEN } from "@/common/constants"
import { ResultCode } from "@/common/enums"
import { baseApi } from "@/app/baseApi"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const [logout] = useLogoutMutation()

  const logoutHandler = () => {
    //dispatch(logoutTC())
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          localStorage.removeItem(AUTH_TOKEN)
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
        }
      })
      .then(() => {
        //dispatch(baseApi.util.resetApiState())
        dispatch(baseApi.util.invalidateTags(["Task", "Todolist"]))
      })
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg" sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>

          <Box>
            <Switch
              onChange={() =>
                dispatch(
                  changeThemeModeAC({
                    themeMode: themeMode === "light" ? "dark" : "light",
                  }),
                )
              }
            />
            {isLoggedIn && (
              <NavButton background={themeMode} onClick={logoutHandler}>
                Logout
              </NavButton>
            )}
            <NavButton background={themeMode}>Faq</NavButton>
          </Box>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
