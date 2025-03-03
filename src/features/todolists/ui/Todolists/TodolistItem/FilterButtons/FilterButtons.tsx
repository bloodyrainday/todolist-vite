import Button from "@/common/components/Button/Button";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import {
  ChangeTodolistFilterAC,
  FilterType,
} from "@/features/todolists/state/todolist-reducer";

type Props = {
  filter: FilterType;
  todolistId: string;
};

export const FilterButtons = (props: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Button
        variant={props.filter === "all" ? "contained" : "outlined"}
        title="All"
        color="success"
        callback={() =>
          dispatch(
            ChangeTodolistFilterAC({ id: props.todolistId, filter: "all" })
          )
        }
      />
      <Button
        title="Active"
        color="success"
        variant={props.filter === "active" ? "contained" : "outlined"}
        callback={() =>
          dispatch(
            ChangeTodolistFilterAC({
              id: props.todolistId,
              filter: "active",
            })
          )
        }
      />
      <Button
        title="Completed"
        color="success"
        variant={props.filter === "completed" ? "contained" : "outlined"}
        callback={() =>
          dispatch(
            ChangeTodolistFilterAC({
              id: props.todolistId,
              filter: "completed",
            })
          )
        }
      />
    </div>
  );
};
