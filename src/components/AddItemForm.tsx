import React, { ChangeEvent, useState } from "react";
import Button from "./Button";

type AddItemFormPropsType = {
  addTask: (title: string, todolistId: string) => void;
  todolistId: string;
};

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
    setError(null);
    // props.callback(taskTitle);
  };

  const onAddTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      props.addTask(taskTitle, props.todolistId);
      setTaskTitle("");
    } else {
      setError("title is required");
    }
  };
  return (
    <div>
      <input
        className={error ? "error" : ""}
        value={taskTitle}
        onChange={onChangeTitleHandler}
      />
      <Button title="+" callback={onAddTaskHandler} />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
