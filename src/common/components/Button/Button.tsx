import StyledButton from "@mui/material/Button";
import IconButton from "@mui/material/IconButton/IconButton";
type ButtonPropsType = {
  title?: string;
  callback: () => void;
  className?: string;
  variant?: "contained" | "outlined" | "text";
  icon?: any;
  color?: "success" | "primary";
};

const Button = (props: ButtonPropsType) => {
  return (
    <>
      {props.icon ? (
        <IconButton color="primary" onClick={props.callback}>
          {props.icon}
        </IconButton>
      ) : (
        <StyledButton
          color={props.color}
          variant={props.variant}
          className={props.className}
          onClick={props.callback}
        >
          {props.title}
        </StyledButton>
      )}
    </>
  );
};

export default Button;
