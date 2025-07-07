import { useContext, useState } from "react";
import { RewardContext } from "./Container";

type PointsCounterProps = {
  teamName: string;
};

export const PointsCounter = ({ teamName }: PointsCounterProps) => {
  const [points, setPoints] = useState(0);
  const [numberToAdd, setNumberToAdd] = useState(100);

  const context = useContext(RewardContext);

  if (!context) {
    throw new Error("PointsCounter must be used within RewardContext.Provider");
  }

  const { rewardValue } = context;

  const addValue = () => {
    setPoints(points + rewardValue);
  };

  const removeValue = () => {
    setPoints(points - rewardValue);
  };

  return (
    <div className="counter">
      <h4>{teamName}</h4>
      <p>{points}$</p>
      <div className="value-button">
        <button className="add-button" onClick={addValue}>
          +
        </button>
        <button className="remove-button" onClick={removeValue}>
          -
        </button>
      </div>
    </div>
  );
};
