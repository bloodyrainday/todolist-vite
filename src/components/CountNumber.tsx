import React from "react";

type CountNumberPropsType = {
  numberData: number;
  maxValue: number;
};

const CountNumber = (props: CountNumberPropsType) => {
  return (
    <p className={props.numberData === props.maxValue ? "error" : ""}>
      {props.numberData}
    </p>
  );
};

export default CountNumber;
