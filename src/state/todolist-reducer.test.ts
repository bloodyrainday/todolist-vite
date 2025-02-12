import { expect, test } from "vitest";
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  RemoveTodolistAC,
  todolistReducer,
} from "./todolist-reducer";
import { TodolistType } from "../App";

test("remove todolist which id was provided", () => {
  const startState: TodolistType[] = [
    {
      id: "1",
      title: "what to learn",
      filter: "all",
    },
    {
      id: "2",
      title: "what to buy",
      filter: "all",
    },
  ];

  const action = RemoveTodolistAC("2");
  const endState = todolistReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe("1");
});

test("add todolist which title was provided", () => {
  const startState: TodolistType[] = [
    {
      id: "1",
      title: "what to learn",
      filter: "all",
    },
    {
      id: "2",
      title: "what to buy",
      filter: "all",
    },
  ];

  const action = AddTodolistAC("what to eat");
  const endState = todolistReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("what to eat");
});

test("change todolist filter which id was provided", () => {
  const startState: TodolistType[] = [
    {
      id: "1",
      title: "what to learn",
      filter: "all",
    },
    {
      id: "2",
      title: "what to buy",
      filter: "all",
    },
  ];

  const action = ChangeTodolistFilterAC("2", "active");
  const endState = todolistReducer(startState, action);

  expect(endState[1].filter).toBe("active");
  expect(endState[1].id).toBe("2");
  expect(endState[0].filter).toBe("all");
});
