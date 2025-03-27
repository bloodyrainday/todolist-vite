import { useAppSelector } from "@/common/hooks/useAppSelector"
import { Paper } from "@mui/material"
import TodolistItem from "./TodolistItem/TodolistItem"
import { useEffect } from "react"
import { useAppDispatch } from "@/common"
import { fetchTodolistsTC, selectTodolists } from "../../state/todolist-slice"

type Props = {}

export const Todolists = (props: Props) => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

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
