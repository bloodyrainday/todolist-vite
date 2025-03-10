import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { AddTodolistAC } from "@/features/todolists/state/todolist-reducer";
import React from "react";

type Props = {};

export const AppHttpRequests = (props: Props) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <AddItemForm addItem={(title) => dispatch(AddTodolistAC(title))} />
    </>
  );
};
