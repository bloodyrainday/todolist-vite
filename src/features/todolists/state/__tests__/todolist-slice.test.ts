// import { beforeEach, expect, test } from "vitest"
// import {
//   ChangeTodolistFilterAC,
//   changeTodolistTitle,
//   createTodolist,
//   deleteTodolist,
//   todolistReducer,
// } from "../todolist-slice"
// import { TodolistType } from "../../api/todolistApi.types"

// let startState: TodolistType[]

// beforeEach(() => {
//   startState = [
//     { id: "1", title: "what to learn", addedDate: "", order: 0, filter: "all", entityStatus: "idle" },
//     { id: "2", title: "what to buy", addedDate: "", order: 0, filter: "all", entityStatus: "idle" },
//   ]
// })

// test("remove todolist which id was provided", () => {
//   const endState = todolistReducer(startState, deleteTodolist.fulfilled({ id: "2" }, "requestId", { id: "2" }))

//   expect(endState.length).toBe(1)
//   expect(endState[0].id).toBe("1")
// })

// test("add todolist which title was provided", () => {
//   const endState = todolistReducer(
//     startState,
//     createTodolist.fulfilled({ todolist: { id: "1", title: "what to eat", addedDate: "", order: 0 } }, "requestTitle", {
//       title: "what to eat",
//     }),
//   )
//   expect(endState.length).toBe(3)
//   expect(endState[0].title).toBe("what to eat")
// })

// test("change todolist filter which id was provided", () => {
//   const action = ChangeTodolistFilterAC({ id: "2", filter: "active" })
//   const endState = todolistReducer(startState, action)

//   expect(endState[1].filter).toBe("active")
//   expect(endState[1].id).toBe("2")
//   expect(endState[0].filter).toBe("all")
// })

// test("change todolist title which id was provided", () => {
//   const endState = todolistReducer(
//     startState,
//     changeTodolistTitle.fulfilled({ id: "2", title: "what to watch" }, "request object with id and title", {
//       id: "2",
//       title: "what to watch",
//     }),
//   )

//   expect(endState[1].title).toBe("what to watch")
//   expect(endState[1].id).toBe("2")
//   expect(endState[0].title).toBe("what to learn")
// })
