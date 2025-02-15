import "./App.css";
import TodolistItem from "./components/TodolistItem";
import { AddItemForm } from "./components/AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/material/Typography";
import { Container, Paper, Stack } from "@mui/material";
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
} from "./state/todolist-reducer";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";

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
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootState, TodolistType[]>(
    (state) => state.todolists
  );

  const removeTodolist = (todolistId: string) => {
    const action = RemoveTodolistAC(todolistId);
    dispatch(action);
  };
  const changeTodolistFilter = (filter: FilterType, todolistId: string) => {
    const action = ChangeTodolistFilterAC(todolistId, filter);
    dispatch(action);
  };

  const addTodolist = (title: string) => {
    const action = AddTodolistAC(title);
    dispatch(action);
  };

  const changeTodolistTitle = (title: string, todolistId: string) => {
    const action = ChangeTodolistTitleAC(todolistId, title);
    dispatch(action);
  };

  return (
    <div>
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
    </div>
  );
}
export default AppWithRedux;
