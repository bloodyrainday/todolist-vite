import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm"
import { Container, Stack } from "@mui/material"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
import { useAppDispatch } from "@/common"
import { createTodolist } from "@/features/todolists/state/todolist-slice"

type Props = {}

export const Main = (props: Props) => {
  const dispatch = useAppDispatch()

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
