import React, { useState } from "react";
import "./App.css";
import { v1 } from "uuid";
import TodolistItem from "./components/TodolistItem";

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
  };

  return (
    <div>
      {todolists.map((tl) => {
        return (
          <TodolistItem
            title={tl.title}
            tasks={tasks[tl.id]}
            key={tl.id}
            todolistId={tl.id}
            removeTask={removeTask}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}
export default App;
