import { CheckCircle, CheckCircleOutline, Delete } from "@mui/icons-material"
import { Checkbox, IconButton } from "@mui/material"
import { ChangeEvent } from "react"
import { EditText } from "@/common/components/EditText/EditText"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { deleteTask, updateTask } from "@/features/todolists/state/task-slice"
import { Task } from "@/features/todolists/api/tasksApi.types"
import { TaskStatus } from "@/common/enums"
import { TodolistType } from "@/features/todolists/api/todolistApi.types"

type Props = {
  task: Task
  todolist: TodolistType
}

export const TaskItem = (props: Props) => {
  const dispatch = useAppDispatch()

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const args = {
      todolistId: props.todolist.id,
      taskId: props.task.id,
      domainModel: { status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New },
    }
    dispatch(updateTask(args))
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
          dispatch(updateTask(args))
        }}
        disabled={props.todolist.entityStatus === "loading"}
      />

      <IconButton
        onClick={() => {
          dispatch(
            deleteTask({
              todolistId: props.todolist.id,
              taskId: props.task.id,
            }),
          )
        }}
        disabled={props.todolist.entityStatus === "loading"}
      >
        <Delete />
      </IconButton>
    </li>
  )
}
