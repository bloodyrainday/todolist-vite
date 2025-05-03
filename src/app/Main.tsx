import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm"
import { Container, Stack } from "@mui/material"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
import { useCreateTodolistMutation } from "@/features/todolists/api/todolistApi"

export const Main = () => {
  //const dispatch = useAppDispatch()
  //const isLoggedIn = useAppSelector(selectIsLoggedIn)

  // if (!isLoggedIn) {
  //   return <Navigate to={Path.Login} />
  // }
  const [createTodolist] = useCreateTodolistMutation()

  const createTodolistHandler = (title: string) => {
    //dispatch(createTodolist({ title }))
    createTodolist(title)
  }
  return (
    <Container fixed>
      <Stack spacing={2} style={{ padding: "20px" }}>
        <AddItemForm addItem={createTodolistHandler} label="Todolist title" />
      </Stack>

      <Stack direction="row" spacing={2}>
        <Todolists />
      </Stack>
    </Container>
  )
}
