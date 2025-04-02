import { CheckCircle, CheckCircleOutline, Delete } from "@mui/icons-material"
import { Checkbox } from "@mui/material"
import { ChangeEvent } from "react"
import { EditText } from "@/common/components/EditText/EditText"

import { Button } from "@/common/components/Button/Button"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { ChangeTaskStatusAC, ChangeTaskTitleAC, deleteTask } from "@/features/todolists/state/task-slice"
import { Task } from "@/features/todolists/api/tasksApi.types"
import { TaskStatus } from "@/common/enums"

type Props = {
  task: Task
  todolistId: string
}

export const TaskItem = (props: Props) => {
  const dispatch = useAppDispatch()

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      ChangeTaskStatusAC({
        todolistId: props.todolistId,
        taskId: props.task.id,
        status: e.currentTarget.checked,
      }),
    )
  }

  return (
    <li>
      <Checkbox
        checked={props.task.status === TaskStatus.Completed}
        onChange={changeTaskStatus}
        icon={<CheckCircleOutline />}
        checkedIcon={<CheckCircle />}
      />
      <EditText
        title={props.task.title}
        callback={(newTitle) => {
          const action = ChangeTaskTitleAC({
            todolistId: props.todolistId,
            taskId: props.task.id,
            title: newTitle,
          })
          dispatch(action)
        }}
      />
      <Button
        icon={<Delete />}
        callback={() => {
          const action = deleteTask({
            todolistId: props.todolistId,
            taskId: props.task.id,
          })
          dispatch(action)
        }}
      />
    </li>
  )
}
