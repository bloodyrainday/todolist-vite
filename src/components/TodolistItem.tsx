import { ChangeEvent } from "react";
import Button from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditText } from "./EditText";
import Delete from "@mui/icons-material/Delete";
import { Checkbox } from "@mui/material";
import { CheckCircle, CheckCircleOutline } from "@mui/icons-material";

import {
  AddTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
} from "@/state/task-reducer.";
import { selectsTasks } from "@/app/tasks-selectors";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import {
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  FilterType,
  RemoveTodolistAC,
} from "@/state/todolist-reducer";

type TodolistItemPropsType = {
  title: string;
  todolistId: string;
  filter: FilterType;
};

const TodolistItem = (props: TodolistItemPropsType) => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(selectsTasks);

  let filteredTasks = tasks[props.todolistId];
  if (props.filter === "active") {
    filteredTasks = filteredTasks.filter((f) => f.isDone === false);
  } else if (props.filter === "completed") {
    filteredTasks = filteredTasks.filter((f) => f.isDone === true);
  }

  return (
    <div>
      <EditText
        title={props.title}
        callback={(newTitle) =>
          dispatch(
            ChangeTodolistTitleAC({ id: props.todolistId, title: newTitle })
          )
        }
      />

      <Button
        icon={<Delete />}
        callback={() => dispatch(RemoveTodolistAC({ id: props.todolistId }))}
      />

      <AddItemForm
        addItem={(newTitle) => {
          const action = AddTaskAC({
            todolistId: props.todolistId,
            title: newTitle,
          });
          dispatch(action);
        }}
        label="Task title"
      />

      <ul>
        {filteredTasks.map((t) => {
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const action = ChangeTaskStatusAC({
              todolistId: props.todolistId,
              taskId: t.id,
              status: e.currentTarget.checked,
            });
            dispatch(action);
          };
          return (
            <li key={t.id}>
              <Checkbox
                checked={t.isDone}
                onChange={onChangeStatusHandler}
                icon={<CheckCircleOutline />}
                checkedIcon={<CheckCircle />}
              />
              <EditText
                title={t.title}
                callback={(newTitle) => {
                  const action = ChangeTaskTitleAC({
                    todolistId: props.todolistId,
                    taskId: t.id,
                    title: newTitle,
                  });
                  dispatch(action);
                }}
              />
              <Button
                icon={<Delete />}
                callback={() => {
                  const action = RemoveTaskAC({
                    todolistId: props.todolistId,
                    taskId: t.id,
                  });
                  dispatch(action);
                }}
              />
            </li>
          );
        })}
      </ul>
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
              ChangeTodolistFilterAC({ id: props.todolistId, filter: "active" })
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
    </div>
  );
};
export default TodolistItem;
