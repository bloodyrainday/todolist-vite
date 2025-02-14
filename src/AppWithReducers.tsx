import { useReducer } from "react";
import "./App.css";
import { v1 } from "uuid";
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
  todolistReducer,
} from "./state/todolist-reducer";
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
  taskReducer,
} from "./state/task-reducer.";

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

function AppWithReducers() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchToTodolistsReducer] = useReducer(todolistReducer, [
    {
      id: todolistId1,
      title: "what to learn",
      filter: "all",
    },
    {
      id: todolistId2,
      title: "what to buy",
      filter: "all",
    },
  ]);
  const [tasks, dispatchToTasksReducer] = useReducer(taskReducer, {
    [todolistId1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        isDone: true,
      },
      {
        id: v1(),
        title: "JS",
        isDone: false,
      },
      {
        id: v1(),
        title: "React",
        isDone: true,
      },
    ],
    [todolistId2]: [
      {
        id: v1(),
        title: "milk",
        isDone: false,
      },
      {
        id: v1(),
        title: "meat",
        isDone: false,
      },
      {
        id: v1(),
        title: "bread",
        isDone: true,
      },
    ],
  });

  const removeTask = (todolistId: string, taskId: string) => {
    const action = RemoveTaskAC(todolistId, taskId);
    dispatchToTasksReducer(action);
  };

  const removeTodolist = (todolistId: string) => {
    const action = RemoveTodolistAC(todolistId);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  };
  const filterTasks = (filter: FilterType, todolistId: string) => {
    const action = ChangeTodolistFilterAC(todolistId, filter);
    dispatchToTodolistsReducer(action);
  };
  const addTask = (title: string, todolistId: string) => {
    const action = AddTaskAC(todolistId, title);
    dispatchToTasksReducer(action);
  };

  const addTodolist = (title: string) => {
    const action = AddTodolistAC(title);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  };

  const changeTaskTitle = (
    title: string,
    todolistId: string,
    taskId: string
  ) => {
    const action = ChangeTaskTitleAC(todolistId, taskId, title);
    dispatchToTasksReducer(action);
  };

  const changeTodolistTitle = (title: string, todolistId: string) => {
    const action = ChangeTodolistTitleAC(todolistId, title);
    dispatchToTodolistsReducer(action);
  };

  const changeTaskStatus = (
    status: boolean,
    todolistId: string,
    taskId: string
  ) => {
    const action = ChangeTaskStatusAC(todolistId, taskId, status);
    dispatchToTasksReducer(action);
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
          {todolists.map((tl) => {
            let filteredTasks = tasks[tl.id];
            if (tl.filter === "active") {
              filteredTasks = filteredTasks.filter((f) => f.isDone === false);
            } else if (tl.filter === "completed") {
              filteredTasks = filteredTasks.filter((f) => f.isDone === true);
            }
            return (
              <Paper style={{ padding: "10px" }}>
                <TodolistItem
                  key={tl.id}
                  title={tl.title}
                  tasks={filteredTasks}
                  todolistId={tl.id}
                  filter={tl.filter}
                  removeTask={removeTask}
                  removeTodolist={removeTodolist}
                  filterTasks={filterTasks}
                  addTask={addTask}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  changeTaskStatus={changeTaskStatus}
                />
              </Paper>
            );
          })}
        </Stack>
      </Container>
    </div>
  );
}
export default AppWithReducers;
