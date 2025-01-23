import React, { useState } from "react";
import "./App.css";
import TodolistItem from "./components/TodolistItem";
import { v1 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

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

  const removeTask = (taskId: string) => {
    setTasksData(tasksData.filter((t) => t.id !== taskId));
  };
  return <TodolistItem tasks={tasksData} removeTask={removeTask} />;
}

export default App;
