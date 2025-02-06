import React, { ChangeEvent, useState } from "react";
import Button from "./Button";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const onChangeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };
  const onAddTaskClickHandler = () => {
    if (inputValue.trim() !== "") {
      props.addItem(inputValue);
    } else {
      setError(true);
    }
    setInputValue("");
  };
  return (
    <div>
      <input
        className={error ? "error-message" : ""}
        value={inputValue}
        onChange={onChangeInputValueHandler}
      />

      <Button title="+" callback={onAddTaskClickHandler} />
      {error && (
        <p className="error" style={{ margin: "0px" }}>
          title is required
        </p>
      )}
    </div>
  );
};
