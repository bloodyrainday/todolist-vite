import React, { useState } from "react";
import "./App.css";
import { v1 } from "uuid";
import TodolistItem from "./components/TodolistItem";
import { AddItemForm } from "./components/AddItemForm";

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
  const tasks = [
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
      isDone: true,
    },
  ];

  return (
    <div>
      <TodolistItem />
    </div>
  );
}
export default App;
