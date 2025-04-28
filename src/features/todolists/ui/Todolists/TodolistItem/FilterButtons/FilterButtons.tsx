import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { FilterType } from "@/features/todolists/api/todolistApi.types"
import { ChangeTodolistFilterAC } from "@/features/todolists/state/todolist-slice"
import { Button } from "@mui/material"

type Props = {
  filter: FilterType
  todolistId: string
}

export const FilterButtons = (props: Props) => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <Button
        variant={props.filter === "all" ? "contained" : "outlined"}
        color="success"
        onClick={() => dispatch(ChangeTodolistFilterAC({ id: props.todolistId, filter: "all" }))}
      >
        {"All"}
      </Button>
      <Button
        color="success"
        variant={props.filter === "active" ? "contained" : "outlined"}
        onClick={() =>
          dispatch(
            ChangeTodolistFilterAC({
              id: props.todolistId,
              filter: "active",
            }),
          )
        }
      >
        {"Active"}
      </Button>
      <Button
        color="success"
        variant={props.filter === "completed" ? "contained" : "outlined"}
        onClick={() =>
          dispatch(
            ChangeTodolistFilterAC({
              id: props.todolistId,
              filter: "completed",
            }),
          )
        }
      >
        {"Completed"}
      </Button>
    </div>
  )
}
