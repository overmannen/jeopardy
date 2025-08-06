import { JSX } from "react";
import Card from "./Card";

type CategoryProps = {
  categoryName: string;
};

const Category = ({ categoryName }: CategoryProps): JSX.Element => {
  const rewards = [100, 200, 300, 400, 500];

  return (
    <div className="category">
      <h3 className="category-title">{categoryName}</h3>
      <div className="category-container"></div>
      {rewards.map((reward, index) => (
        <Card
          rewardValue={reward}
          key={index}
          reward={reward.toString() + "$"}
        ></Card>
      ))}
    </div>
  );
};

export default Category;
