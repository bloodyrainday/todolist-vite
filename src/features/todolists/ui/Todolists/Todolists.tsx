import { selectTodolists } from "@/app/todolists-selectors";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { Paper } from "@mui/material";
import TodolistItem from "./TodolistItem/TodolistItem";

type Props = {};

export const Todolists = (props: Props) => {
  const todolists = useAppSelector(selectTodolists);
  return (
    <>
      {todolists &&
        todolists.map((tl) => {
          return (
            <Paper style={{ padding: "10px" }}>
              <TodolistItem key={tl.id} todolist={tl} />
            </Paper>
          );
        })}
    </>
  );
};
