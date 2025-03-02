import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { AddItemForm } from "@/components/AddItemForm";
import TodolistItem from "@/components/TodolistItem";
import { Container, Paper, Stack } from "@mui/material";
import React from "react";
import { selectTodolists } from "./todolists-selectors";
import { AddTodolistAC } from "@/state/todolist-reducer";

type Props = {};

export const Main = (props: Props) => {
  const dispatch = useAppDispatch();

  const todolists = useAppSelector(selectTodolists);

  const addTodolist = (title: string) => {
    dispatch(AddTodolistAC(title));
  };
  return (
    <Container fixed>
      <Stack spacing={2} style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} label="Todolist title" />
      </Stack>

      <Stack direction="row" spacing={2}>
        {todolists &&
          todolists.map((tl) => {
            return (
              <Paper style={{ padding: "10px" }}>
                <TodolistItem
                  key={tl.id}
                  title={tl.title}
                  todolistId={tl.id}
                  filter={tl.filter}
                />
              </Paper>
            );
          })}
      </Stack>
    </Container>
  );
};
