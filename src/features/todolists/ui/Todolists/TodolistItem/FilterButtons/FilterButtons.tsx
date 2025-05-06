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
  const changeFilter = (filter: FilterType) => {
    dispatch(ChangeTodolistFilterAC({ id: props.todolistId, filter }))
  }
  return (
    <div>
      <Button
        variant={props.filter === "all" ? "contained" : "outlined"}
        color="success"
        onClick={() => changeFilter("all")}
      >
        {"All"}
      </Button>
      <Button
        color="success"
        variant={props.filter === "active" ? "contained" : "outlined"}
        onClick={() => changeFilter("active")}
      >
        {"Active"}
      </Button>
      <Button
        color="success"
        variant={props.filter === "completed" ? "contained" : "outlined"}
        onClick={() => changeFilter("completed")}
      >
        {"Completed"}
      </Button>
    </div>
  )
}
