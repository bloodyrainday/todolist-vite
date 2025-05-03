import { Paper } from "@mui/material"
import TodolistItem from "./TodolistItem/TodolistItem"
import { useGetTodolistsQuery } from "../../api/todolistApi"

export const Todolists = () => {
  //const todolists = useAppSelector(selectTodolists)
  const { data: todolists } = useGetTodolistsQuery()
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(fetchTodolists())
  // }, [])

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
