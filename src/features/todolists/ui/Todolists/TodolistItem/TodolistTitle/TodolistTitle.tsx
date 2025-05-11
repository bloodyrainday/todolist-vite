import { EditText } from "@/common/components/EditText/EditText"
import { Delete } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import {
  todolistApi,
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation,
} from "@/features/todolists/api/todolistApi"
import { useAppDispatch } from "@/common"
import { RequestStatus } from "@/common/types"
import { TodolistType } from "@/features/todolists/lib/types"

type Props = {
  todolist: TodolistType
}

export const TodolistTitle = (props: Props) => {
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()
  const [deleteTodolist] = useDeleteTodolistMutation()

  const dispatch = useAppDispatch()

  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === props.todolist.id)
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      }),
    )
  }

  const deleteTodolistHandler = (id: string) => {
    changeTodolistStatus("loading")
    deleteTodolist(id)
      .unwrap()
      .catch(() => {
        changeTodolistStatus("failed")
      })
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
