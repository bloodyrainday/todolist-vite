import { CheckCircle, CheckCircleOutline, Delete } from "@mui/icons-material"
import { Checkbox, IconButton } from "@mui/material"
import { ChangeEvent } from "react"
import { EditText } from "@/common/components/EditText/EditText"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { deleteTask, updateTask } from "@/features/todolists/state/task-slice"
import { Task, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"
import { TaskStatus } from "@/common/enums"
import { TodolistType } from "@/features/todolists/api/todolistApi.types"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi"

type Props = {
  task: Task
  todolist: TodolistType
}

export const TaskItem = (props: Props) => {
  const dispatch = useAppDispatch()
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const model: UpdateTaskModel = {
      title: props.task.title,
      description: props.task.description,
      status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
      priority: props.task.priority,
      startDate: props.task.startDate,
      deadline: props.task.deadline,
    }

    // const args = {
    //   todolistId: props.todolist.id,
    //   taskId: props.task.id,
    //   domainModel: { status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New },
    // }
    updateTask({ todolistId: props.todolist.id, taskId: props.task.id, model })
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
        callback={(newTitle) => {
          const args = {
            todolistId: props.todolist.id,
            taskId: props.task.id,
            domainModel: { title: newTitle },
          }
          //dispatch(updateTask(args))
        }}
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
