import { Box, Paper } from "@mui/material"
import TodolistItem from "./TodolistItem/TodolistItem"
import { useGetTodolistsQuery } from "../../api/todolistApi"
import { containerSx } from "@/common/styles/container.styles"
import { TodolistSkeleton } from "./TodolistSkeleton/TodolistSkeleton"

export const Todolists = () => {
  //const todolists = useAppSelector(selectTodolists)
  const { data: todolists, isLoading } = useGetTodolistsQuery()
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(fetchTodolists())
  // }, [])

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <>
      {todolists &&
        todolists.map((tl) => {
          return (
            <Paper style={{ padding: "10px" }} key={tl.id}>
              <TodolistItem key={tl.id} todolist={tl} />
            </Paper>
          )
        })}
    </>
  )
}
