import React from "react";

type ButtonPropsType = {
  title: string;
  callback: () => void;
};

const Button = (props: ButtonPropsType) => {
  return <button onClick={props.callback}>{props.title}</button>;
};

export default Button;
