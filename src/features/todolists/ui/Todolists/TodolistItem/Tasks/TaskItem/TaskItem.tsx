import { CheckCircle, CheckCircleOutline, Delete } from "@mui/icons-material"
import { Checkbox } from "@mui/material"
import { ChangeEvent } from "react"
import { EditText } from "@/common/components/EditText/EditText"
import { Button } from "@/common/components/Button/Button"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { deleteTask, updateTask } from "@/features/todolists/state/task-slice"
import { Task } from "@/features/todolists/api/tasksApi.types"
import { TaskStatus } from "@/common/enums"

type Props = {
  task: Task
  todolistId: string
}

export const TaskItem = (props: Props) => {
  const dispatch = useAppDispatch()

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const args = {
      todolistId: props.todolistId,
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
      />
      <EditText
        title={props.task.title}
        callback={(newTitle) => {
          const args = {
            todolistId: props.todolistId,
            taskId: props.task.id,
            domainModel: { title: newTitle },
          }

          dispatch(updateTask(args))
        }}
      />
      <Button
        icon={<Delete />}
        callback={() => {
          dispatch(
            deleteTask({
              todolistId: props.todolistId,
              taskId: props.task.id,
            }),
          )
        }}
      />
    </li>
  )
}
