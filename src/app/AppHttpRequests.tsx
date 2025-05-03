// import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react"
// import Checkbox from "@mui/material/Checkbox"
// import { AddItemForm, EditText } from "@/common/components"
// import { Todolist } from "@/features/todolists/api/todolistApi.types"
// import { todolistApi } from "@/features/todolists/api/todolistApi"
// import { tasksApi } from "@/features/todolists/api/tasksApi"
// import { Task, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"
// import { TaskStatus } from "@/common/enums/enums"

// export const AppHttpRequests = () => {
//   const [todolists, setTodolists] = useState<Todolist[]>([])
//   const [tasks, setTasks] = useState<Record<string, Task[]>>({})
//   console.log("todolists", todolists)
//   console.log("tasks", tasks)

//   useEffect(() => {
//     todolistApi.getTodolists().then((res) => {
//       const todolists = res.data
//       setTodolists(todolists)

//       todolists.forEach((tl) => {
//         tasksApi.getTasks(tl.id).then((res) => {
//           console.log("got tasks data", res.data)

//           setTasks((state) => ({ ...state, [tl.id]: [...res.data.items] }))
//         })
//       })
//     })
//   }, [])

//   const createTodolist = (title: string) => {
//     todolistApi.createTodolist(title).then((res) => setTodolists([res.data.data.item, ...todolists]))
//   }

//   const deleteTodolist = (id: string) => {
//     todolistApi.deleteTodolist(id).then((res) => {
//       setTodolists(todolists.filter((tl) => tl.id !== id))
//     })
//   }

//   const changeTodolistTitle = (id: string, title: string) => {
//     todolistApi.changeTodolistTitle(id, title).then((res) => {
//       setTodolists(todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl)))
//     })
//   }

//   const createTask = (todolistId: string, title: string) => {
//     debugger
//     tasksApi.createTask(todolistId, title).then((res) => {
//       setTasks({ ...tasks, [todolistId]: [res.data.data.item, ...tasks[todolistId]] })
//     })
//   }

//   const deleteTask = (todolistId: string, taskId: string) => {
//     tasksApi
//       .deleteTask(todolistId, taskId)
//       .then(() => setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) }))
//   }

//   const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: Task) => {
//     const model: UpdateTaskModel = {
//       title: task.title,
//       description: task.description,
//       status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
//       priority: task.priority,
//       startDate: task.startDate,
//       deadline: task.deadline,
//     }
//     tasksApi.updateTask(task.todoListId, task.id, model).then((res) => {
//       const todolistId = task.todoListId
//       const updatedTask = res.data.data.item
//       setTasks({
//         ...tasks,
//         [todolistId]: tasks[todolistId].map((t) => (t.id === task.id ? updatedTask : t)),
//       })
//     })
//   }

//   const changeTaskTitle = (task: Task, title: string) => {
//     const model: UpdateTaskModel = {
//       title: title,
//       description: task.description,
//       status: task.status,
//       priority: task.priority,
//       startDate: task.startDate,
//       deadline: task.deadline,
//     }
//     tasksApi.updateTask(task.todoListId, task.id, model).then((res) => {
//       const todolistId = task.todoListId
//       const updatedTask = res.data.data.item
//       setTasks({
//         ...tasks,
//         [todolistId]: tasks[todolistId].map((t) => (t.id === task.id ? updatedTask : t)),
//       })
//     })
//   }

//   return (
//     <div style={{ margin: "20px" }}>
//       <AddItemForm addItem={createTodolist} />
//       {todolists.map((todolist: any) => (
//         <div key={todolist.id} style={container}>
//           <div>
//             <EditText title={todolist.title} callback={(title) => changeTodolistTitle(todolist.id, title)} />
//             <button onClick={() => deleteTodolist(todolist.id)}>x</button>
//           </div>
//           <AddItemForm addItem={(title) => createTask(todolist.id, title)} />
//           {tasks[todolist.id]?.map((task) => (
//             <div key={task.id}>
//               <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
//               <EditText title={task.title} callback={(title) => changeTaskTitle(task, title)} />
//               <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   )
// }

// const container: CSSProperties = {
//   border: "1px solid black",
//   margin: "20px 0",
//   padding: "10px",
//   width: "300px",
//   display: "flex",
//   justifyContent: "space-between",
//   flexDirection: "column",
// }
