import { TaskItem } from "./TaskItem/TaskItem"
import { TaskStatus } from "@/common/enums"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi"
import { TasksSkeleton } from "./TasksSkeleton/TasksSkeleton"
import { setError } from "@/app/app-slice"
import { useAppDispatch } from "@/common"
import { useEffect, useState } from "react"
import { TodolistType } from "@/features/todolists/lib/types"
import { TasksPagination } from "./TasksPagination/TasksPagination"
import { PAGE_SIZE } from "@/common/constants"

type Props = {
  todolist: TodolistType
}

export const Tasks = (props: Props) => {
  //const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useGetTasksQuery(
    { todolistId: props.todolist.id, params: { page } },
    { refetchOnFocus: true },
  )
  useEffect(() => {
    if (!error) return
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
  }, [error])

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
    <>
      <ul>
        {filteredTasks &&
          filteredTasks.map((t) => {
            return <TaskItem key={t.id} task={t} todolist={props.todolist} />
          })}
      </ul>
      {data && data?.totalCount > PAGE_SIZE && (
        <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
      )}
    </>
  )
}
