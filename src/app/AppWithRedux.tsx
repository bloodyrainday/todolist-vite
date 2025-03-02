import "./App.css";
import TodolistItem from "@/components/TodolistItem";
import { AddItemForm } from "@/components/AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/material/Typography";
import {
  Container,
  createTheme,
  CssBaseline,
  Paper,
  Stack,
  Switch,
} from "@mui/material";
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
} from "@/state/todolist-reducer";

import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTodolists } from "./todolists-selectors";
import { ThemeProvider } from "@emotion/react";
import { changeThemeModeAC } from "./app-reducer";
import { selectThemeMode } from "./app-selectors";
import { getTheme } from "../common/theme/theme";
import { Header } from "@/common/components/Header/Header";
import { Main } from "./Main";

export type FilterType = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TaskStorageType = {
  [key: string]: TaskType[];
};

function AppWithRedux() {
  const themeMode = useAppSelector(selectThemeMode);

  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  );
}
export default AppWithRedux;
