import { fetchTasks, selectTasks, TaskType } from "@/features/todolists/state/task-slice"
import { TaskItem } from "./TaskItem/TaskItem"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/common"
import { TodolistType } from "@/features/todolists/state/todolist-slice"

type Props = {
  todolist: TodolistType
}

export const Tasks = (props: Props) => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [])

  let filteredTasks: TaskType[] = tasks[props.todolist.id]
  if (props.todolist.filter === "active") {
    filteredTasks = filteredTasks.filter((f) => f.isDone === false)
  } else if (props.todolist.filter === "completed") {
    filteredTasks = filteredTasks.filter((f) => f.isDone === true)
  }
  return (
    <ul>
      {tasks &&
        tasks[props.todolist.id].map((t) => {
          return <TaskItem key={t.id} task={t} todolistId={props.todolist.id} />
        })}
    </ul>
  )
}
