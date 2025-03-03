import { EditText } from "./EditText";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import {
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  TodolistType,
} from "@/state/todolist-reducer";
import { Delete } from "@mui/icons-material";
import Button from "./Button";

type Props = {
  todolist: TodolistType;
};

export const TodolistTitle = (props: Props) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <EditText
        title={props.todolist.title}
        callback={(newTitle) =>
          dispatch(
            ChangeTodolistTitleAC({ id: props.todolist.id, title: newTitle })
          )
        }
      />

      <Button
        icon={<Delete />}
        callback={() => dispatch(RemoveTodolistAC({ id: props.todolist.id }))}
      />
    </>
  );
};
