import { useAppSelector } from "@/common/hooks/useAppSelector"
import { Paper } from "@mui/material"
import TodolistItem from "./TodolistItem/TodolistItem"
import { useEffect } from "react"
import { useAppDispatch } from "@/common"
import { fetchTodolists, selectTodolists } from "../../state/todolist-slice"
import { useGetTodolistsQuery } from "../../api/todolistApi"

type Props = {}

export const Todolists = (props: Props) => {
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
