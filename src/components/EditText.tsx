import React, { ChangeEvent, useState } from "react";

type EditTextPropsType = {
  title: string;
  onChange: (newTitle: string) => void;
};

export const EditText = (props: EditTextPropsType) => {
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
