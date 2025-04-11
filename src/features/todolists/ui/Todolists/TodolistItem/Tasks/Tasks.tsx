import { fetchTasks, selectTasks } from "@/features/todolists/state/task-slice"
import { TaskItem } from "./TaskItem/TaskItem"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/common"
import { TodolistType } from "@/features/todolists/state/todolist-slice"
import { Task } from "@/features/todolists/api/tasksApi.types"
import { TaskStatus } from "@/common/enums"

type Props = {
  todolist: TodolistType
}

export const Tasks = (props: Props) => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasks(props.todolist.id))
  }, [])

  let filteredTasks: Task[] = tasks[props.todolist.id]
  if (props.todolist.filter === "active") {
    filteredTasks = filteredTasks.filter((f) => f.status === TaskStatus.New)
  } else if (props.todolist.filter === "completed") {
    filteredTasks = filteredTasks.filter((f) => f.status === TaskStatus.Completed)
  }
  return (
    <ul>
      {filteredTasks &&
        filteredTasks.map((t) => {
          return <TaskItem key={t.id} task={t} todolist={props.todolist} />
        })}
    </ul>
  )
}
