import { createContext, JSX, useState } from "react";
import Category from "./Category";
import { PointsCounter } from "./PointsCounter";
import { PointsCounterContainer } from "./PointsCounterContainer";

type RewardContextType = {
  rewardValue: number;
  setRewardValue: (value: number) => void;
};

export const RewardContext = createContext<RewardContextType | undefined>(
  undefined
);

type ContainerProps = {
  name: string;
  teamNames: string[];
};

const Container = ({ name, teamNames }: ContainerProps): JSX.Element => {
  const categoryNames = ["Farger", "Dyr", "Steder", "Mat", "Sport"]; // Liste over kategorinavn
  const [rewardValue, setRewardValue] = useState<number>(0);

  return (
    <RewardContext.Provider value={{ rewardValue, setRewardValue }}>
      <h1 className="title">{name}</h1>
      <div className="container">
        {categoryNames.map((categoryName, index) => (
          <Category key={index} categoryName={categoryName} />
        ))}
      </div>
      <PointsCounterContainer teamNames={teamNames} />
    </RewardContext.Provider>
  );
};

export default Container;
