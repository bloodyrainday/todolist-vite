import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { Tasks } from "./Tasks/Tasks"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { AddTaskAC } from "@/features/todolists/state/task-slice"
import { TodolistType } from "@/features/todolists/state/todolist-slice"

export type TodolistItemPropsType = {
  todolist: TodolistType
}

const TodolistItem = (props: TodolistItemPropsType) => {
  const dispatch = useAppDispatch()

  const createTask = (newTitle: string) => {
    dispatch(
      AddTaskAC({
        todolistId: props.todolist.id,
        title: newTitle,
      }),
    )
  }

  return (
    <div>
      <TodolistTitle todolist={props.todolist} />
      <AddItemForm addItem={createTask} label="Task title" />
      <Tasks todolist={props.todolist} />
      <FilterButtons filter={props.todolist.filter} todolistId={props.todolist.id} />
    </div>
  )
}
export default TodolistItem
