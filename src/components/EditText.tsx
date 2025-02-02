import React, { ChangeEvent, useState } from "react";

type EditTextPropsType = {
  title: string;
  onChange: (newTitle: string) => void;
};

export const EditText = (props: EditTextPropsType) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  console.log(newTitle);

  const onDoubleClickHandler = () => {
    setEdit(true);
    setNewTitle(props.title);
  };

  const onBlurHandler = () => {
    setEdit(false);
    props.onChange(newTitle);
  };
  return (
    <>
      {edit ? (
        <input
          type="text"
          onBlur={onBlurHandler}
          value={newTitle}
          onChange={(e) => setNewTitle(e.currentTarget.value)}
          autoFocus
        />
      ) : (
        <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
      )}
    </>
  );
};
