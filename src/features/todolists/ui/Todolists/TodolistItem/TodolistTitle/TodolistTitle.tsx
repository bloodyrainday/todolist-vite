import { EditText } from "@/common/components/EditText/EditText"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { Delete } from "@mui/icons-material"
import Button from "@/common/components/Button/Button"
import { ChangeTodolistTitleAC, RemoveTodolistAC, TodolistType } from "@/features/todolists/state/todolist-reducer"

type Props = {
  todolist: TodolistType
}

export const TodolistTitle = (props: Props) => {
  const dispatch = useAppDispatch()

  return (
    <>
      <EditText
        title={props.todolist.title}
        callback={(newTitle) => dispatch(ChangeTodolistTitleAC({ id: props.todolist.id, title: newTitle }))}
      />

      <Button icon={<Delete />} callback={() => dispatch(RemoveTodolistAC({ id: props.todolist.id }))} />
    </>
  )
}
