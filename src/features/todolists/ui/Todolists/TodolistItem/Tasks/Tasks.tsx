import { TaskType } from "@/features/todolists/state/task-slice"
import { TaskItem } from "./TaskItem/TaskItem"

type Props = {
  tasks: TaskType[]
  todolistId: string
}

export const Tasks = (props: Props) => {
  return (
    <ul>
      {props.tasks &&
        props.tasks.map((t) => {
          return <TaskItem key={t.id} task={t} todolistId={props.todolistId} />
        })}
    </ul>
  )
}
