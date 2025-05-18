// import { beforeEach, expect, test } from "vitest"
// import { v1 } from "uuid"
// import { createTask, deleteTask, tasksReducer, TaskStorageType, updateTask } from "../task-slice"
// import { TaskPriority, TaskStatus } from "@/common/enums"
// import { createTodolist, deleteTodolist } from "../todolist-slice"

// const taskDefaultValues = {
//   description: "",
//   deadline: "",
//   addedDate: "",
//   startDate: "",
//   priority: TaskPriority.Low,
//   order: 0,
// }

// let startState: TaskStorageType
// const todolistId1 = v1()
// const todolistId2 = v1()

// beforeEach(() => {
//   startState = {
//     [todolistId1]: [
//       {
//         id: "1",
//         title: "CSS",
//         status: TaskStatus.New,
//         todoListId: "todolistId1",
//         ...taskDefaultValues,
//       },
//       {
//         id: "2",
//         title: "JS",
//         status: TaskStatus.Completed,
//         todoListId: "todolistId1",
//         ...taskDefaultValues,
//       },
//       {
//         id: "3",
//         title: "React",
//         status: TaskStatus.New,
//         todoListId: "todolistId1",
//         ...taskDefaultValues,
//       },
//     ],
//     [todolistId2]: [
//       {
//         id: "1",
//         title: "bread",
//         status: TaskStatus.New,
//         todoListId: "todolistId2",
//         ...taskDefaultValues,
//       },
//       {
//         id: "2",
//         title: "milk",
//         status: TaskStatus.Completed,
//         todoListId: "todolistId2",
//         ...taskDefaultValues,
//       },
//       {
//         id: "3",
//         title: "tea",
//         status: TaskStatus.New,
//         todoListId: "todolistId2",
//         ...taskDefaultValues,
//       },
//     ],
//   }
// })

// test("remove task which id was provided", () => {
//   const endState = tasksReducer(
//     startState,
//     deleteTask.fulfilled(
//       { todolistId: todolistId2, taskId: startState[todolistId2][1].id },
//       "required object with todolistId and taskId",
//       { todolistId: todolistId2, taskId: startState[todolistId2][1].id },
//     ),
//   )

//   expect(endState[todolistId2].length).toBe(2)
//   expect(endState[todolistId1].length).toBe(3)
// })

// test("add task which title was provided", () => {
//   const endState = tasksReducer(
//     startState,
//     createTask.fulfilled(
//       {
//         task: {
//           id: "0",
//           title: "potato",
//           status: TaskStatus.New,
//           todoListId: todolistId2,
//           ...taskDefaultValues,
//         },
//       },
//       "required object with todolistId and task",
//       { todolistId: todolistId2, title: "potato" },
//     ),
//   )

//   expect(endState[todolistId2].length).toBe(4)
//   expect(endState[todolistId2][0].title).toBe("potato")
//   expect(endState[todolistId1].length).toBe(3)
//   expect(endState[todolistId1][0].title).toBe("CSS")
// })

// test("change task title which id was provided", () => {
//   const endState = tasksReducer(
//     startState,
//     updateTask.fulfilled(
//       {
//         task: {
//           id: "1",
//           title: "tomatos",
//           status: TaskStatus.New,
//           todoListId: todolistId2,
//           ...taskDefaultValues,
//         },
//       },
//       "required task object",

//       {
//         todolistId: todolistId2,
//         taskId: "1",
//         domainModel: {
//           title: "bread",
//         },
//       },
//     ),
//   )

//   expect(endState[todolistId2].length).toBe(3)
//   expect(endState[todolistId2][0].title).toBe("tomatos")
//   expect(endState[todolistId1].length).toBe(3)
//   expect(endState[todolistId1][0].title).toBe("CSS")
// })

// test("change task status which id was provided", () => {
//   const endState = tasksReducer(
//     startState,
//     updateTask.fulfilled(
//       {
//         task: {
//           id: "1",
//           title: "bread",
//           status: TaskStatus.Completed,
//           todoListId: todolistId2,
//           ...taskDefaultValues,
//         },
//       },
//       "required task object",

//       {
//         todolistId: todolistId2,
//         taskId: "1",
//         domainModel: {
//           status: TaskStatus.Completed,
//         },
//       },
//     ),
//   )

//   expect(endState[todolistId2].length).toBe(3)
//   expect(endState[todolistId2][0].status).toBe(2)
//   expect(endState[todolistId2][0].title).toBe("bread")
//   expect(endState[todolistId1].length).toBe(3)
//   expect(endState[todolistId1][0].status).toBe(0)
//   expect(endState[todolistId1][0].title).toBe("CSS")
// })

// test("add an empty tasks array to a new todolist that was just added", () => {
//   const endState = tasksReducer(
//     startState,
//     createTodolist.fulfilled(
//       { todolist: { id: "0", title: "what to eat", addedDate: "", order: 0 } },
//       "required task object",
//       { title: "what to eat" },
//     ),
//   )

//   const keys = Object.keys(endState)

//   expect(keys.length).toBe(3)
//   expect(endState["0"].length).toBe(0)
//   expect(endState[todolistId2].length).toBe(3)
//   expect(endState[todolistId1].length).toBe(3)
// })

// test("remove tasks array when a specific todolist was just removed", () => {
//   const endState = tasksReducer(
//     startState,
//     deleteTodolist.fulfilled({ id: todolistId2 }, "required task object", { id: todolistId2 }),
//   )

//   const keys = Object.keys(endState)
//   const values = Object.values(endState)

//   expect(keys.length).toBe(1)
//   expect(values[0].length).toBe(3)
//   expect(endState[todolistId1][0].title).toBe("CSS")
//   expect(endState[todolistId1][1].title).toBe("JS")
//   expect(endState[todolistId1][2].title).toBe("React")
// })
