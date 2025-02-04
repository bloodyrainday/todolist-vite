import React, { useState } from "react";
import "./App.css";
import { v1 } from "uuid";
import TodolistItem from "./components/TodolistItem";
import { AddItemForm } from "./components/AddItemForm";

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

  return (
    <div>
      <AddItemForm addItem={(newTitle) => addTodolist(newTitle)} />
      {todolists.map((tl) => {
        let filteredTasks = tasks[tl.id];
        if (tl.filter === "active") {
          filteredTasks = filteredTasks.filter((f) => f.isDone === false);
        } else if (tl.filter === "completed") {
          filteredTasks = filteredTasks.filter((f) => f.isDone === true);
        }
        return (
          <>
            <TodolistItem
              title={tl.title}
              tasks={filteredTasks}
              key={tl.id}
              todolistId={tl.id}
              filter={tl.filter}
              removeTask={removeTask}
              removeTodolist={removeTodolist}
              filterTasks={filterTasks}
              addTask={addTask}
            />
          </>
        );
      })}
    </div>
  );
}
export default App;
