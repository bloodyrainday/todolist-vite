import { EditText } from "@/common/components/EditText/EditText"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { Delete } from "@mui/icons-material"
import { changeTodolistTitle } from "@/features/todolists/state/todolist-slice"
import { IconButton } from "@mui/material"
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolists/api/todolistApi"
import { TodolistType } from "@/features/todolists/api/todolistApi.types"

type Props = {
  todolist: TodolistType
}

export const TodolistTitle = (props: Props) => {
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()
  const [deleteTodolist] = useDeleteTodolistMutation()

  const deleteTodolistHandler = (id: string) => {
    deleteTodolist(id)
  }

  const changeTodolistTitleHandler = (id: string, title: string) => {
    changeTodolistTitle({ id, title })
  }

  return (
    <>
      <EditText
        title={props.todolist.title}
        callback={(newTitle) => changeTodolistTitleHandler(props.todolist.id, newTitle)}
        disabled={props.todolist.entityStatus === "loading"}
      />

      <IconButton
        onClick={() => deleteTodolistHandler(props.todolist.id)}
        disabled={props.todolist.entityStatus === "loading"}
      >
        <Delete />
      </IconButton>
    </>
  )
}
