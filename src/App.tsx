import "./App.css";
import TodolistItem from "./components/TodolistItem";

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
    <div className="app">
      <TodolistItem />
    </div>
  );
}

export default App;
