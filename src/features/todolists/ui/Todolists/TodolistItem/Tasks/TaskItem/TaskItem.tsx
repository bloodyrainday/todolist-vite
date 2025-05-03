import { CheckCircle, CheckCircleOutline, Delete } from "@mui/icons-material"
import { Checkbox, IconButton } from "@mui/material"
import { ChangeEvent } from "react"
import { EditText } from "@/common/components/EditText/EditText"
import { Task, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"
import { TaskStatus } from "@/common/enums"
import { TodolistType } from "@/features/todolists/api/todolistApi.types"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi"

type Props = {
  task: Task
  todolist: TodolistType
}

export const TaskItem = (props: Props) => {
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const model: UpdateTaskModel = {
    title: props.task.title,
    description: props.task.description,
    status: props.task.status,
    priority: props.task.priority,
    startDate: props.task.startDate,
    deadline: props.task.deadline,
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const domainModel = { status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New }
    // const args = {
    //   todolistId: props.todolist.id,
    //   taskId: props.task.id,
    //   domainModel: { status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New },
    // }
    updateTask({ todolistId: props.todolist.id, taskId: props.task.id, model: { ...model, ...domainModel } })
  }

  const changeTaskTitleHandler = (title: string) => {
    // const args = {
    //   todolistId: props.todolist.id,
    //   taskId: props.task.id,
    //   domainModel: { title: newTitle },
    // }
    //dispatch(updateTask(args))
    const domainModel = { title }

    updateTask({ todolistId: props.todolist.id, taskId: props.task.id, model: { ...model, ...domainModel } })
  }

  return (
    <li>
      <Checkbox
        checked={props.task.status === TaskStatus.Completed}
        onChange={changeTaskStatusHandler}
        icon={<CheckCircleOutline />}
        checkedIcon={<CheckCircle />}
        disabled={props.todolist.entityStatus === "loading"}
      />
      <EditText
        title={props.task.title}
        callback={changeTaskTitleHandler}
        disabled={props.todolist.entityStatus === "loading"}
      />

      <IconButton
        onClick={() => {
          deleteTask({
            todolistId: props.todolist.id,
            taskId: props.task.id,
          })
        }}
        disabled={props.todolist.entityStatus === "loading"}
      >
        <Delete />
      </IconButton>
    </li>
  )
}
