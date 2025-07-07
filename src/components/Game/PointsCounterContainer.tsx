import { useState } from "react";
import { PointsCounter } from "./PointsCounter";

type PointsCounterContainerProps = {
  teamNames: string[];
};

export const PointsCounterContainer = ({
  teamNames,
}: PointsCounterContainerProps) => {
  return (
    <div className="counter-container">
      {teamNames &&
        teamNames.map((name, index) => {
          return <PointsCounter teamName={name} key={index} />;
        })}
    </div>
  );
};
