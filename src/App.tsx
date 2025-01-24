import React, { useState } from "react";
import "./App.css";
import TodolistItem from "./components/TodolistItem";
import { v1 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterType = "all" | "active" | "completed";

function App() {
  const tasks: TaskType[] = [
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
  ];

  const [tasksData, setTasksData] = useState<TaskType[]>(tasks);
  const [filter, setFilter] = useState<FilterType>("all");

  const removeTask = (taskId: string) => {
    setTasksData(tasksData.filter((t) => t.id !== taskId));
  };

  const filterTasks = (filter: FilterType) => {
    tasksData;
    if (filter === "all") {
      return tasksData;
    } else if (filter === "active") {
      return tasksData.filter((t) => t.isDone === false);
    } else {
      return tasksData.filter((t) => t.isDone === true);
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
      tasks={filteredTasks}
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
