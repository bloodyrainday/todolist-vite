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

  const filterTasks = (tasks: TaskObjectType, filter: FilterType) => {
    let filteredTasks = tasks;
    if (filter === "all") {
      return filteredTasks;
    } else if (filter === "active") {
      return filteredTasks.filter((t) => t.isDone === false);
    } else {
      return filteredTasks.filter((t) => t.isDone === true);
    }
  };

  let filteredTasks: TaskType[] = filterTasks(filter);
  const addTask = (title: string) => {
    let newTask = { id: v1(), title, isDone: false };
    setTasksData([newTask, ...tasksData]);
  };
  const changeTaskStatus = (taskId: string, status: boolean) => {
    console.log(taskId, status);
    let task = tasksData.find((t) => t.id === taskId);
    if (task) {
      task.isDone = status;
      setTasksData([...tasksData]);
    }
  };
  return (
    <TodolistItem
      tasks={filterTasks(tasksData, filter)}
      removeTask={removeTask}
      filterTasks={filterTasks}
      setFilter={setFilter}
      addTask={addTask}
      filter={filter}
      changeTaskStatus={changeTaskStatus}
    />
  );
}
export default App;
