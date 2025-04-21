import { v1 } from "uuid"
import { expect, test } from "vitest"

import { createTodolist, todolistReducer } from "../todolist-slice"
import { tasksReducer, TaskStorageType } from "../task-slice"
import { TaskPriority, TaskStatus } from "@/common/enums"
import { TodolistType } from "../../api/todolistApi.types"

const taskDefaultValues = {
  description: "",
  deadline: "",
  addedDate: "",
  startDate: "",
  priority: TaskPriority.Low,
  order: 0,
}

test("tasks and todolists id should be the same", () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
  const tasksStartState: TaskStorageType = {
    [todolistId1]: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    [todolistId2]: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatus.Completed,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  }

  const todolistsStartState: TodolistType[] = [
    { id: "1", title: "what to learn", addedDate: "", order: 0, filter: "all", entityStatus: "idle" },
    { id: "2", title: "what to buy", addedDate: "", order: 0, filter: "all", entityStatus: "idle" },
  ]

  const tasksEndState = tasksReducer(
    tasksStartState,
    createTodolist.fulfilled(
      { todolist: { id: "0", title: "what to eat", addedDate: "", order: 0 } },
      "required task object",
      { title: "what to eat" },
    ),
  )

  const todolistsEndState = todolistReducer(
    todolistsStartState,
    createTodolist.fulfilled({ todolist: { id: "0", title: "what to eat", addedDate: "", order: 0 } }, "requestTitle", {
      title: "what to eat",
    }),
  )

  const keys = Object.keys(tasksEndState)

  expect(keys[0]).toBe("0")
  expect(todolistsEndState[0].id).toBe("0")
  expect(keys[0]).toBe(todolistsEndState[0].id)
})
