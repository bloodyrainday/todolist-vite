import React, { useState } from "react";
import "./App.css";
import { v1 } from "uuid";
import TodolistItem from "./components/TodolistItem";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type FilterType = "all" | "active" | "completed";

export type TaskObjectType = {
  [key: string]: TaskType[];
};

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();
  const todolists: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const tasks: TaskObjectType = {
    [todolistId1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        isDone: true,
      },
      {
        id: v1(),
        title: "JS",
        isDone: true,
      },
      {
        id: v1(),
        title: "React",
        isDone: false,
      },
    ],
    [todolistId2]: [
      {
        id: v1(),
        title: "milk",
        isDone: true,
      },
      {
        id: v1(),
        title: "bread",
        isDone: true,
      },
      {
        id: v1(),
        title: "meat",
        isDone: false,
      },
    ],
  };

  // const tasks: TaskType[] = [
  //   {
  //     id: v1(),
  //     title: "HTML&CSS",
  //     isDone: true,
  //   },
  //   {
  //     id: v1(),
  //     title: "JS",
  //     isDone: true,
  //   },
  //   {
  //     id: v1(),
  //     title: "React",
  //     isDone: false,
  //   },
  // ];

  const [tasksData, setTasksData] = useState<TaskObjectType>(tasks);
  const [todolistsData, setTodolistsData] = useState<TodolistType[]>(todolists);

  const removeTask = (taskId: string, todolistId: string) => {
    setTasksData({
      ...tasksData,
      [todolistId]: tasksData[todolistId].filter((t) => t.id !== taskId),
    });
  };

  const filterTasks = (
    tasks: TaskObjectType,
    filter: FilterType,
    todolistId: string
  ) => {
    let filteredTasks = tasks[todolistId];
    if (filter === "all") {
      return filteredTasks;
    } else if (filter === "active") {
      return filteredTasks.filter((t) => t.isDone === false);
    } else {
      return filteredTasks.filter((t) => t.isDone === true);
    }
  };

  const addTask = (title: string, todolistId: string) => {
    let newTask: TaskType = { id: v1(), title, isDone: false };
    setTasksData({
      ...tasksData,
      [todolistId]: [newTask, ...tasksData[todolistId]],
    });
  };

  const changeTaskStatus = (
    taskId: string,
    status: boolean,
    todolistId: string
  ) => {
    setTasksData({
      ...tasksData,
      [todolistId]: tasksData[todolistId].map((t) =>
        t.id === taskId ? { ...t, isDone: status } : t
      ),
    });
  };

  const setFilter = (filter: FilterType, todolistId: string) => {
    setTodolistsData(
      todolistsData.map((tl) => (tl.id === todolistId ? { ...tl, filter } : tl))
    );
  };

  const removeTodolist = (todolistId: string) => {
    setTodolistsData(todolistsData.filter((tl) => tl.id !== todolistId));
    delete tasksData[todolistId];
  };
  return (
    <div style={{ display: "flex", gap: "40px" }}>
      {todolistsData.map((tl) => {
        return (
          <TodolistItem
            key={tl.id}
            todolistId={tl.id}
            tasks={filterTasks(tasksData, tl.filter, tl.id)}
            removeTask={removeTask}
            setFilter={setFilter}
            addTask={addTask}
            filter={tl.filter}
            changeTaskStatus={changeTaskStatus}
            removeTodolist={removeTodolist}
            title={tl.title}
          />
        );
      })}
    </div>
  );
}
export default App;
