import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { AddItemForm } from "@/components/AddItemForm";
import { Container, Stack } from "@mui/material";
import { AddTodolistAC } from "@/state/todolist-reducer";
import { Todolists } from "@/components/Todolists";

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
