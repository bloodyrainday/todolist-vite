import React from "react";

type ButtonPropsType = {
  title: string;
  callback: () => void;
  disabled?: boolean;
};

const Button = (props: ButtonPropsType) => {
  return (
    <button onClick={props.callback} disabled={props.disabled}>
      {props.title}
    </button>
  );
};

export default Button;
