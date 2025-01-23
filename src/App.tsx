import { ChangeEvent, useState } from "react";
import "./App.css";
import TodolistItem from "./components/TodolistItem";
import { v1 } from "uuid";

function App() {
  const tasks = [
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
}

export default App;
