import { changeThemeModeAC, selectStatus, selectThemeMode } from "@/app/app-slice"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { logoutTC, selectIsLoggedIn } from "@/features/auth/model/auth-slice"
import { AppBar, Box, Container, IconButton, LinearProgress, Switch, Toolbar, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { NavButton } from "../NavButton/NavButton"
import { containerSx } from "@/common/styles/container.styles"
import { Navigate, useNavigate } from "react-router"
import { Path } from "@/common/routing/Routing"
import { clearDataAC } from "@/common/actions"

type Props = {}

export const Header = (props: Props) => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    debugger
    dispatch(logoutTC())
    dispatch(clearDataAC([]))
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
                Sign out
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
