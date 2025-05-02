import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { Tasks } from "./Tasks/Tasks"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { createTask } from "@/features/todolists/state/task-slice"
import { TodolistType } from "@/features/todolists/api/todolistApi.types"
import { useCreateTaskMutation } from "@/features/todolists/api/tasksApi"

export type TodolistItemPropsType = {
  todolist: TodolistType
}

const TodolistItem = (props: TodolistItemPropsType) => {
  const dispatch = useAppDispatch()
  const [createTask] = useCreateTaskMutation()
  const createTaskHandler = (newTitle: string) => {
    createTask({
      todolistId: props.todolist.id,
      title: newTitle,
    })
    // dispatch(
    //   createTask({
    //     todolistId: props.todolist.id,
    //     title: newTitle,
    //   }),
    // )
  }

  return (
    <div>
      <TodolistTitle todolist={props.todolist} />
      <AddItemForm
        addItem={createTaskHandler}
        label="Task title"
        disabled={props.todolist.entityStatus === "loading"}
      />
      <Tasks todolist={props.todolist} />
      <FilterButtons filter={props.todolist.filter} todolistId={props.todolist.id} />
    </div>
  )
}
export default TodolistItem
