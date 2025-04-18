import { changeThemeModeAC, selectStatus, selectThemeMode } from "@/app/app-slice"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { AppBar, IconButton, LinearProgress, Switch, Toolbar, Typography } from "@mui/material"
import MenuIcon from "@mui/material/Typography"

type Props = {}

export const Header = (props: Props) => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)

  const dispatch = useAppDispatch()

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Todolist
        </Typography>
        <Switch
          onChange={() =>
            dispatch(
              changeThemeModeAC({
                themeMode: themeMode === "light" ? "dark" : "light",
              }),
            )
          }
        />
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
