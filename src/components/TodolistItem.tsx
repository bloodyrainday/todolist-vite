import { ChangeEvent } from "react";
import { FilterType, TaskType } from "../App";
import Button from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditText } from "./EditText";
import Delete from "@mui/icons-material/Delete";
import { Checkbox } from "@mui/material";
import { CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../state/store";
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
} from "../state/task-reducer.";

type TodolistItemPropsType = {
  title: string;
  todolistId: string;
  filter: FilterType;
  removeTodolist: (todolistId: string) => void;
  changeTodolistFilter: (filter: FilterType, todolistId: string) => void;
  changeTodolistTitle: (title: string, todolistId: string) => void;
};

const TodolistItem = (props: TodolistItemPropsType) => {
  const dispatch = useDispatch();

  const tasks = useSelector<AppRootState, TaskType[]>(
    (state) => state.tasks[props.todolistId]
  );
  let filteredTasks = tasks;
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
          props.changeTodolistTitle(newTitle, props.todolistId)
        }
      />

      <Button
        icon={<Delete />}
        callback={() => props.removeTodolist(props.todolistId)}
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
          callback={() => props.changeTodolistFilter("all", props.todolistId)}
        />
        <Button
          title="Active"
          color="success"
          variant={props.filter === "active" ? "contained" : "outlined"}
          callback={() =>
            props.changeTodolistFilter("active", props.todolistId)
          }
        />
        <Button
          title="Completed"
          color="success"
          variant={props.filter === "completed" ? "contained" : "outlined"}
          callback={() =>
            props.changeTodolistFilter("completed", props.todolistId)
          }
        />
      </div>
    </div>
  );
};
export default TodolistItem;
