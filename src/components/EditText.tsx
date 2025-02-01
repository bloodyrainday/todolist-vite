import React, { ChangeEvent, useState } from "react";

type EditTextPropsType = {
  title: string;
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
  return (
    <>
      {edit ? (
        <input
          type="text"
          onBlur={() => setEdit(false)}
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
