import React, { useState } from "react";
import "../App.css";
import Button from "./Button";
import CountNumber from "./CountNumber";
import ProgressBar from "./ProgressBar";

const Counter = () => {
  const max = Math.floor(10 * Math.random() + 1);
  const [maxValue, setMaxValue] = useState<number>(max);
  const [numberData, setNumberData] = useState<number>(0);

  const increaseNumber = () => {
    if (numberData < maxValue) {
      setNumberData(numberData + 1);
    }
  };

  const resetNumber = () => {
    setNumberData(0);
    setMaxValue(max);
  };

  return (
    <div className="counter">
      <span>max value: {maxValue}</span>
      <CountNumber numberData={numberData} maxValue={maxValue} />
      <ProgressBar numberData={numberData} maxValue={maxValue} />
      <Button
        className="btn"
        title={"inc"}
        callback={increaseNumber}
        disabled={numberData === maxValue}
      ></Button>
      <Button
        className="btn"
        title={"reset"}
        callback={resetNumber}
        disabled={numberData === 0}
      />
    </div>
  );
};

export default Counter;
