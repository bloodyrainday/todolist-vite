import { changeThemeModeAC, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedIn } from "@/app/app-slice"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { logoutTC } from "@/features/auth/model/auth-slice"
import { AppBar, Box, Container, IconButton, LinearProgress, Switch, Toolbar, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { NavButton } from "../NavButton/NavButton"
import { containerSx } from "@/common/styles/container.styles"
import { Navigate, useNavigate } from "react-router"
import { Path } from "@/common/routing/Routing"
import { clearDataAC } from "@/common/actions"
import { useLogoutMutation } from "@/features/auth/api/authApi"
import { AUTH_TOKEN } from "@/common/constants"
import { ResultCode } from "@/common/enums"

type Props = {}

export const Header = (props: Props) => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const [logout] = useLogoutMutation()

  const logoutHandler = () => {
    //dispatch(logoutTC())
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        localStorage.removeItem(AUTH_TOKEN)
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
      }
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
