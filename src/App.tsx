import React, { useState } from "react";
import "./App.css";
import { v1 } from "uuid";
import TodolistItem from "./components/TodolistItem";
import { AddItemForm } from "./components/AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box, Container, Paper, Stack } from "@mui/material";

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

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
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
  const [tasks, setTasks] = useState<TaskStorageType>({
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
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
    });
  };

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((tl) => tl.id !== todolistId));
    delete tasks[todolistId];
  };
  const filterTasks = (filter: FilterType, todolistId: string) => {
    setTodolists(
      todolists.map((tl) => (tl.id === todolistId ? { ...tl, filter } : tl))
    );
  };
  const addTask = (title: string, todolistId: string) => {
    const newTask: TaskType = { id: v1(), title, isDone: false };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  };

  const addTodolist = (title: string) => {
    const newTodolist: TodolistType = { id: v1(), title, filter: "all" };
    setTodolists([newTodolist, ...todolists]);
    setTasks({ ...tasks, [newTodolist.id]: [] });
  };

  const editTaskTitle = (title: string, todolistId: string, taskId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, title } : t
      ),
    });
  };

  const editTodolistTitle = (title: string, todolistId: string) => {
    setTodolists(
      todolists.map((tl) => (tl.id === todolistId ? { ...tl, title } : tl))
    );
  };

  const changeTaskStatus = (
    status: boolean,
    todolistId: string,
    taskId: string
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, isDone: status } : t
      ),
    });
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
                  editTaskTitle={editTaskTitle}
                  editTodolistTitle={editTodolistTitle}
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
export default App;
