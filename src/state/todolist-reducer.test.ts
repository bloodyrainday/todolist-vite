import { expect, test } from "vitest";
import { RemoveTodolistAC, todolistReducer } from "./todolist-reducer";
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
});
