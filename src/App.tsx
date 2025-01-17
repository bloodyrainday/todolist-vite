import { useState } from "react";
import "./App.css";
import TodolistItem from "./components/TodolistItem";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

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

  const filterButton = ["All", "Active", "Completed"];

  const [todolistTasks, setTodolistTasks] = useState<TaskType[]>(tasks);

  const deleteTask = (id: number) => {
    setTodolistTasks(todolistTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <TodolistItem
        tasks={todolistTasks}
        filterButton={filterButton}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
