import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { todolistApi } from "@/features/todolists/api/todolistApi"
import { FilterType } from "@/features/todolists/lib/types"
import { Button } from "@mui/material"

type Props = {
  filter: FilterType
  todolistId: string
}

export const FilterButtons = (props: Props) => {
  const dispatch = useAppDispatch()
  const changeFilter = (filter: FilterType) => {
    dispatch(
      todolistApi.util.updateQueryData("getTodolists", undefined, (todolists) => {
        const todolist = todolists.find((s) => s.id === props.todolistId)
        if (todolist) {
          todolist.filter = filter
        }
      }),
    )
    //dispatch(ChangeTodolistFilterAC({ id: props.todolistId, filter }))
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
