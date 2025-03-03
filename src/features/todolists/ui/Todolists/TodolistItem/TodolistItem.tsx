import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm";
import { selectsTasks } from "@/app/tasks-selectors";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { Tasks } from "./Tasks/Tasks";
import { FilterButtons } from "./FilterButtons/FilterButtons";
import { AddTaskAC, TaskType } from "@/features/todolists/state/task-reducer.";
import { TodolistType } from "@/features/todolists/state/todolist-reducer";

type TodolistItemPropsType = {
  todolist: TodolistType;
};

const TodolistItem = (props: TodolistItemPropsType) => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(selectsTasks);

  let filteredTasks: TaskType[] = tasks[props.todolist.id];
  if (props.todolist.filter === "active") {
    filteredTasks = filteredTasks.filter((f) => f.isDone === false);
  } else if (props.todolist.filter === "completed") {
    filteredTasks = filteredTasks.filter((f) => f.isDone === true);
  }

  const createTask = (newTitle: string) => {
    dispatch(
      AddTaskAC({
        todolistId: props.todolist.id,
        title: newTitle,
      })
    );
  };

  return (
    <div>
      <TodolistTitle todolist={props.todolist} />
      <AddItemForm addItem={createTask} label="Task title" />
      <Tasks tasks={filteredTasks} todolistId={props.todolist.id} />
      <FilterButtons
        filter={props.todolist.filter}
        todolistId={props.todolist.id}
      />
    </div>
  );
};
export default TodolistItem;
