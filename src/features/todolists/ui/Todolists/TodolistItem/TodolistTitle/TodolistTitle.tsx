import { EditText } from "@/common/components/EditText/EditText"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { Delete } from "@mui/icons-material"
import { Button } from "@/common/components/Button/Button"
import { changeTodolistTitle, deleteTodolist, TodolistType } from "@/features/todolists/state/todolist-slice"
import { IconButton } from "@mui/material"

type Props = {
  todolist: TodolistType
}

export const TodolistTitle = (props: Props) => {
  const dispatch = useAppDispatch()

  return (
    <>
      <EditText
        title={props.todolist.title}
        callback={(newTitle) => dispatch(changeTodolistTitle({ id: props.todolist.id, title: newTitle }))}
      />

      <IconButton
        onClick={() => dispatch(deleteTodolist({ id: props.todolist.id }))}
        disabled={props.todolist.entityStatus === "loading"}
      >
        <Delete />
      </IconButton>
    </>
  )
}
