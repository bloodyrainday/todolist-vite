import React, { Children } from "react";
import StyledButton from "@mui/material/Button";
type ButtonPropsType = {
  title: string;
  callback: () => void;
  className?: string;
  variant?: "contained" | "outlined" | "text";
};

const Button = (props: ButtonPropsType) => {
  return (
    <StyledButton
      variant={props.variant}
      className={props.className}
      onClick={props.callback}
    >
      {props.title}
    </StyledButton>
  );
};

export default Button;
