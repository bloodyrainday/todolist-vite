import Button from "./Button";
import { AddItemForm } from "./AddItemForm";
import { AddTaskAC } from "@/state/task-reducer.";
import { selectsTasks } from "@/app/tasks-selectors";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { ChangeTodolistFilterAC, TodolistType } from "@/state/todolist-reducer";
import { TodolistTitle } from "./TodolistTitle";
import { Tasks } from "./Tasks";

type TodolistItemPropsType = {
  todolist: TodolistType;
};

const TodolistItem = (props: TodolistItemPropsType) => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(selectsTasks);

  let filteredTasks = tasks[props.todolist.id];
  if (props.todolist.filter === "active") {
    filteredTasks = filteredTasks.filter((f) => f.isDone === false);
  } else if (props.todolist.filter === "completed") {
    filteredTasks = filteredTasks.filter((f) => f.isDone === true);
  }

  return (
    <div>
      <TodolistTitle todolist={props.todolist} />

      <AddItemForm
        addItem={(newTitle) => {
          const action = AddTaskAC({
            todolistId: props.todolist.id,
            title: newTitle,
          });
          dispatch(action);
        }}
        label="Task title"
      />

      <Tasks tasks={filteredTasks} todolistId={props.todolist.id} />
      <div>
        <Button
          variant={props.todolist.filter === "all" ? "contained" : "outlined"}
          title="All"
          color="success"
          callback={() =>
            dispatch(
              ChangeTodolistFilterAC({ id: props.todolist.id, filter: "all" })
            )
          }
        />
        <Button
          title="Active"
          color="success"
          variant={
            props.todolist.filter === "active" ? "contained" : "outlined"
          }
          callback={() =>
            dispatch(
              ChangeTodolistFilterAC({
                id: props.todolist.id,
                filter: "active",
              })
            )
          }
        />
        <Button
          title="Completed"
          color="success"
          variant={
            props.todolist.filter === "completed" ? "contained" : "outlined"
          }
          callback={() =>
            dispatch(
              ChangeTodolistFilterAC({
                id: props.todolist.id,
                filter: "completed",
              })
            )
          }
        />
      </div>
    </div>
  );
};
export default TodolistItem;
