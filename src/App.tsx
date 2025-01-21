import { ChangeEvent, useState } from "react";
import "./App.css";
import TodolistItem from "./components/TodolistItem";
import { v1 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TaskFilterType = "all" | "active" | "completed";

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

  const [todolistTasks, setTodolistTasks] = useState<TaskType[]>(tasks);
  const [filter, setFilter] = useState<TaskFilterType>("all");

  const deleteTask = (id: string) => {
    setTodolistTasks(todolistTasks.filter((task) => task.id !== id));
  };

  let filteredTasks = todolistTasks;

  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.isDone);
  }
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task) => !task.isDone);
  }

  const addTask = (title: string) => {
    setTodolistTasks([{ id: v1(), title, isDone: false }, ...todolistTasks]);
  };

  const checkTask = (id: string, status: boolean) => {
    const task = todolistTasks.find((t) => t.id === id);
    if (task) {
      task.isDone = status;
      setTodolistTasks([...todolistTasks]);
    }
  };

  return (
    <div className="app">
      <TodolistItem
        tasks={filteredTasks}
        deleteTask={deleteTask}
        setFilter={setFilter}
        addTask={addTask}
        checkTask={checkTask}
      />
    </div>
  );
}

export default App;
