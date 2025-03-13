import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm";
import { Container, Stack } from "@mui/material";
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists";
import { AddTodolistAC } from "@/features/todolists/state/todolist-reducer";
import { useAppDispatch } from "@/common";

type Props = {};

export const Main = (props: Props) => {
  const dispatch = useAppDispatch();

  const addTodolist = (title: string) => {
    dispatch(AddTodolistAC(title));
  };
  return (
    <Container fixed>
      <Stack spacing={2} style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} label="Todolist title" />
      </Stack>

      <Stack direction="row" spacing={2}>
        <Todolists />
      </Stack>
    </Container>
  );
};
