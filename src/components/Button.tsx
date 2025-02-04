import React from "react";

type ButtonPropsType = {
  title: string;
  callback: () => void;
  className?: string;
};

const Button = (props: ButtonPropsType) => {
  return (
    <button className={props.className} onClick={props.callback}>
      {props.title}
    </button>
  );
};

export default Button;
