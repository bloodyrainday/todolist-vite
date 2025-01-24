import React from "react";

type ButtonPropsType = {
  title: string;
  callback: () => void;
  disabled?: boolean;
  className?: string;
};

const Button = (props: ButtonPropsType) => {
  return (
    <button
      className={props.className}
      onClick={props.callback}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
};

export default Button;
