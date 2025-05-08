import { TaskItem } from "./TaskItem/TaskItem"
import { TaskStatus } from "@/common/enums"
import { TodolistType } from "@/features/todolists/api/todolistApi.types"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi"
import { TasksSkeleton } from "./TasksSkeleton/TasksSkeleton"
import { setError } from "@/app/app-slice"
import { useAppDispatch } from "@/common"

type Props = {
  todolist: TodolistType
}

export const Tasks = (props: Props) => {
  //const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()
  const { data, isLoading, error, isError } = useGetTasksQuery(props.todolist.id)

  if (error) {
    if ("status" in error) {
      // FetchBaseQueryError
      const errMsg = "error" in error ? error.error : JSON.stringify(error.data)
      dispatch(setError({ error: errMsg }))
    } else {
      // SerializedError
      dispatch(setError({ error: error.message || "Some error occurred" }))
    }
  }

  // if (isError) {
  //   dispatch(setError({ error: (error as any).data.message }))
  // }

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
