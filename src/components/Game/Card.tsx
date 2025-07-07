import { createContext, JSX, useContext, useEffect, useState } from "react";
import { MdOutlineTransitEnterexit } from "react-icons/md";
import { RewardContext } from "./Container";

type CardProps = {
  reward: string;
  rewardValue: number;
};

const Card = ({ reward, rewardValue }: CardProps): JSX.Element => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const context = useContext(RewardContext);
  if (!context) {
    throw new Error("");
  }

  const { setRewardValue } = context;

  const toggleFullscreen = (e: boolean) => {
    setIsFullscreen(e);
    if (!e) {
      setIsDone(true);
    }
  };

  const handleClick = (e: boolean, reward: number) => {
    toggleFullscreen(e);
    setRewardValue(reward);
  };

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleFullscreen(false);
      }
    };
    if (isFullscreen) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isFullscreen]);

  return (
    <div
      onClick={() => handleClick(true, rewardValue)}
      className="card"
      style={{
        top: isFullscreen ? "0" : "auto",
        left: isFullscreen ? "0" : "auto",
        width: isFullscreen ? "99.8vw" : "19.5vw",
        height: isFullscreen ? "100vh" : "100px",
        zIndex: isFullscreen ? "1000" : "auto",
        position: isFullscreen ? "fixed" : "relative",
        cursor: isFullscreen ? "default" : "pointer",
        backgroundColor: isDone ? "grey" : "blue",
      }}
    >
      <p>
        {!isFullscreen
          ? reward
          : "Here one hint will appear in the near future"}
      </p>

      {isFullscreen ? (
        <MdOutlineTransitEnterexit
          style={{
            position: "fixed",
            right: "0",
            top: "0",
            cursor: "pointer",
            fontSize: "2rem",
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFullscreen(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default Card;
