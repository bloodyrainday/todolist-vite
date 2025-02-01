import React, { ChangeEvent, useState } from "react";

type EditTextPropsType = {
  title: string;
  onChange: (newTitle: string) => void;
};

export const EditText = (props: EditTextPropsType) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const onDoubleClickHandler = () => {
    setEdit(true);
    setNewTitle(props.title);
  };

  const onBlurHandler = () => {
    setEdit(false);
    props.onChange(newTitle);
  };
  console.log(newTitle);
  return (
    <>
      {edit ? (
        <input
          type="text"
          onBlur={onBlurHandler}
          value={newTitle}
          onChange={onChangeTitleHandler}
          autoFocus
        />
      ) : (
        <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
      )}
    </>
  );
};
