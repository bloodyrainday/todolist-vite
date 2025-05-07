import { TaskItem } from "./TaskItem/TaskItem"
import { TaskStatus } from "@/common/enums"
import { TodolistType } from "@/features/todolists/api/todolistApi.types"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi"
import { TasksSkeleton } from "./TasksSkeleton/TasksSkeleton"

type Props = {
  todolist: TodolistType
}

export const Tasks = (props: Props) => {
  //const tasks = useAppSelector(selectTasks)
  //const dispatch = useAppDispatch()
  const { data, isLoading } = useGetTasksQuery(props.todolist.id)

  if (isLoading) {
    return <TasksSkeleton />
  }

  // useEffect(() => {
  //   dispatch(fetchTasks(props.todolist.id))
  // }, [])

  let filteredTasks = data?.items
  if (props.todolist.filter === "active") {
    filteredTasks = filteredTasks?.filter((f) => f.status === TaskStatus.New)
  } else if (props.todolist.filter === "completed") {
    filteredTasks = filteredTasks?.filter((f) => f.status === TaskStatus.Completed)
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
