import "./App.css";
import TodolistItem from "../components/TodolistItem";
import { AddItemForm } from "../components/AddItemForm";
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
} from "../state/todolist-reducer";

import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { selectTodolists } from "./todolists-selectors";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";

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
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(selectTodolists);

  const removeTodolist = (todolistId: string) => {
    const action = RemoveTodolistAC({ id: todolistId });
    dispatch(action);
  };
  const changeTodolistFilter = (filter: FilterType, todolistId: string) => {
    const action = ChangeTodolistFilterAC({ id: todolistId, filter });
    dispatch(action);
  };

  const addTodolist = (title: string) => {
    const action = AddTodolistAC(title);
    dispatch(action);
  };

  const changeTodolistTitle = (title: string, todolistId: string) => {
    const action = ChangeTodolistTitleAC({ id: todolistId, title });
    dispatch(action);
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const darkTheme = createTheme({
    palette: {
      mode: `${isDarkMode ? "dark" : "light"}`,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Todolist
          </Typography>
          <Switch
            defaultChecked={isDarkMode ? true : false}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Stack spacing={2} style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} label="Todolist title" />
        </Stack>

        <Stack direction="row" spacing={2}>
          {todolists &&
            todolists.map((tl) => {
              return (
                <Paper style={{ padding: "10px" }}>
                  <TodolistItem
                    key={tl.id}
                    title={tl.title}
                    todolistId={tl.id}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistFilter={changeTodolistFilter}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              );
            })}
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
export default AppWithRedux;
