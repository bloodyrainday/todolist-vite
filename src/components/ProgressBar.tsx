import React from "react";

type ProgressBarPropsType = {
  numberData: number;
  maxValue: number;
};

const ProgressBar = (props: ProgressBarPropsType) => {
  return (
    <div
      style={{
        border: "1px solid black",
        height: "5px",
        width: "80px",
        margin: "5px auto",
      }}
    >
      <div
        style={{
          backgroundColor: "green",
          width: `${(props.numberData / props.maxValue) * 100}%`,
          height: "100%",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
