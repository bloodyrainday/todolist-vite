import {
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
  TaskType,
} from "@/state/task-reducer.";
import { CheckCircle, CheckCircleOutline, Delete } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { ChangeEvent } from "react";
import { EditText } from "./EditText";
import Button from "./Button";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";

type Props = {
  tasks: TaskType[];
  todolistId: string;
};

export const Tasks = (props: Props) => {
  const dispatch = useAppDispatch();

  return (
    <ul>
      {props.tasks.map((t) => {
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
  );
};
