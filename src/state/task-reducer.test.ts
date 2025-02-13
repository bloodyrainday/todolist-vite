import { expect, test } from "vitest";
import { TaskStorageType } from "../App";
import { v1 } from "uuid";
import { AddTaskAC, RemoveTaskAC, taskReducer } from "./task-reducer.";

test("remove todolist which id was provided", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();
  const startState: TaskStorageType = {
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
  };

  const action = RemoveTaskAC(todolistId2, startState[todolistId2][1].id);
  const endState = taskReducer(startState, action);

  expect(endState[todolistId2].length).toBe(2);
  expect(endState[todolistId1].length).toBe(3);
});

test("add todolist which title was provided", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();
  const startState: TaskStorageType = {
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
  };

  const action = AddTaskAC(todolistId2, "potato");
  const endState = taskReducer(startState, action);

  expect(endState[todolistId2].length).toBe(4);
  expect(endState[todolistId2][0].title).toBe("potato");
  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId1][0].title).toBe("HTML&CSS");
});
