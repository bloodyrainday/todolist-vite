import { EditText } from "@/common/components/EditText/EditText"
import { Delete } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import {
  todolistApi,
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation,
} from "@/features/todolists/api/todolistApi"
import { TodolistType } from "@/features/todolists/api/todolistApi.types"
import { useAppDispatch } from "@/common"

type Props = {
  todolist: TodolistType
}

export const TodolistTitle = (props: Props) => {
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()
  const [deleteTodolist] = useDeleteTodolistMutation()

  const dispatch = useAppDispatch()

  const deleteTodolistHandler = (id: string) => {
    dispatch(
      todolistApi.util.updateQueryData("getTodolists", undefined, (todolists) => {
        const todolist = todolists.find((s) => s.id === id)
        if (todolist) {
          todolist.entityStatus = "loading"
        }
      }),
    )
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
