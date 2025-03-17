import { v1 } from "uuid"
import { expect, test } from "vitest"

import { AddTodolistAC, todolistReducer, TodolistType } from "../todolist-reducer"
import { tasksReducer, TaskStorageType } from "../task-reducer."

test("tasks and todolists id should be the same", () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
  const tasksStartState: TaskStorageType = {
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
  }

  const todolistsStartState: TodolistType[] = [
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
  ]

  const action = AddTodolistAC("what to do")
  const tasksEndState = tasksReducer(tasksStartState, action)
  const todolistsEndState = todolistReducer(todolistsStartState, action)

  const keys = Object.keys(tasksEndState)

  expect(keys[2]).toBe(action.payload.id)
  expect(todolistsEndState[0].id).toBe(action.payload.id)
  expect(keys[2]).toBe(todolistsEndState[0].id)
})
