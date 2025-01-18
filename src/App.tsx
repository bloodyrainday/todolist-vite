import { useState } from "react";
import "./App.css";
import TodolistItem from "./components/TodolistItem";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export type TaskFilterType = "all" | "active" | "completed";

function App() {
  const tasks: TaskType[] = [
    {
      id: 0,
      title: "HTML&CSS",
      isDone: true,
    },
    {
      id: 1,
      title: "JS",
      isDone: true,
    },
    {
      id: 2,
      title: "React",
      isDone: false,
    },
  ];

  const [todolistTasks, setTodolistTasks] = useState<TaskType[]>(tasks);
  const [filter, setFilter] = useState<TaskFilterType>("all");

  const deleteTask = (id: number) => {
    setTodolistTasks(todolistTasks.filter((task) => task.id !== id));
  };

  let filteredTasks = todolistTasks;
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.isDone);
  }
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task) => !task.isDone);
  }

  return (
    <div className="app">
      <TodolistItem
        tasks={filteredTasks}
        deleteTask={deleteTask}
        setFilter={setFilter}
      />
    </div>
  );
}

export default App;
