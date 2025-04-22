import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm"
import { Container, Stack } from "@mui/material"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
import { useAppDispatch, useAppSelector } from "@/common"
import { createTodolist } from "@/features/todolists/state/todolist-slice"
import { Navigate } from "react-router"
import { Path } from "@/common/routing/Routing"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice"

type Props = {}

export const Main = (props: Props) => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  // if (!isLoggedIn) {
  //   return <Navigate to={Path.Login} />
  // }

  const addTodolist = (title: string) => {
    dispatch(createTodolist({ title }))
  }
  return (
    <Container fixed>
      <Stack spacing={2} style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} label="Todolist title" />
      </Stack>

      <Stack direction="row" spacing={2}>
        <Todolists />
      </Stack>
    </Container>
  )
}
