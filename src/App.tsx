import React, { useState } from "react";
import "./App.css";
import { v1 } from "uuid";
import TodolistItem from "./components/TodolistItem";

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const todolists = [
    {
      id: todolistId1,
      title: "what to learn",
      filter: "all",
    },
    {
      id: todolistId2,
      title: "what to learn",
      filter: "all",
    },
  ];
  const tasks = {
    [todolistId1]: [
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
    ],
    [todolistId2]: [
      {
        id: 0,
        title: "milk",
        isDone: true,
      },
      {
        id: 1,
        title: "meat",
        isDone: true,
      },
      {
        id: 2,
        title: "bread",
        isDone: true,
      },
    ],
  };

  return (
    <div>
      {todolists.map((tl) => {
        return <TodolistItem />;
      })}
    </div>
  );
}
export default App;
