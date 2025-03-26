import { expect, test } from "vitest"
import { v1 } from "uuid"
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
  tasksReducer,
  TaskStorageType,
} from "../task-slice"
import { AddTodolistAC, RemoveTodolistAC } from "../todolist-slice"

test("remove task which id was provided", () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
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
  }

  const action = RemoveTaskAC({
    todolistId: todolistId2,
    taskId: startState[todolistId2][1].id,
  })
  const endState = tasksReducer(startState, action)

  expect(endState[todolistId2].length).toBe(2)
  expect(endState[todolistId1].length).toBe(3)
})

test("add task which title was provided", () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
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
  }

  const action = AddTaskAC({ todolistId: todolistId2, title: "potato" })
  const endState = tasksReducer(startState, action)

  expect(endState[todolistId2].length).toBe(4)
  expect(endState[todolistId2][0].title).toBe("potato")
  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][0].title).toBe("HTML&CSS")
})

test("change task title which id was provided", () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
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
  }

  const action = ChangeTaskTitleAC({
    todolistId: todolistId2,
    taskId: startState[todolistId2][0].id,
    title: "tomatos",
  })
  const endState = tasksReducer(startState, action)

  expect(endState[todolistId2].length).toBe(3)
  expect(endState[todolistId2][0].title).toBe("tomatos")
  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][0].title).toBe("HTML&CSS")
})

test("change task status which id was provided", () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
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
  }

  const action = ChangeTaskStatusAC({
    todolistId: todolistId2,
    taskId: startState[todolistId2][0].id,
    status: true,
  })
  const endState = tasksReducer(startState, action)

  expect(endState[todolistId2].length).toBe(3)
  expect(endState[todolistId2][0].isDone).toBeTruthy()
  expect(endState[todolistId2][0].title).toBe("milk")
  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][0].isDone).toBeTruthy()
  expect(endState[todolistId1][0].title).toBe("HTML&CSS")
})

test("add an empty tasks array to a new todolist that was just added", () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
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
  }

  const action = AddTodolistAC("what to watch")
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const values = Object.values(endState)
  console.log(values)
  expect(keys.length).toBe(3)
  expect(endState[action.payload.id].length).toBe(0)
  expect(endState[todolistId2].length).toBe(3)
  expect(endState[todolistId1].length).toBe(3)
})

test("remove tasks array when a specific todolist was just removed", () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
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
  }

  const action = RemoveTodolistAC({ id: todolistId2 })
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const values = Object.values(endState)

  expect(keys.length).toBe(1)
  expect(values[0].length).toBe(3)
  expect(endState[todolistId1][0].title).toBe("HTML&CSS")
  expect(endState[todolistId1][1].title).toBe("JS")
  expect(endState[todolistId1][2].title).toBe("React")
})
