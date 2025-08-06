import { JSX, useContext, useEffect, useState } from "react";
import { MdOutlineTransitEnterexit } from "react-icons/md";
import ReactDOM from "react-dom";
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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isFullscreen]);

  const FullscreenCard = () => (
    <div
      className="card fullscreen-card"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        cursor: "default",
        backgroundColor: "blue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "3rem",
        color: "white",
        background: "linear-gradient(135deg, #001366, #003399)",
      }}
    >
      <p style={{ textAlign: "center", padding: "2rem" }}>{reward}</p>

      <MdOutlineTransitEnterexit
        style={{
          position: "fixed",
          right: "20px",
          top: "20px",
          cursor: "pointer",
          fontSize: "3rem",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "50%",
          padding: "10px",
          zIndex: 1001,
        }}
        onClick={(e) => {
          e.stopPropagation();
          toggleFullscreen(false);
        }}
      />
    </div>
  );

  return (
    <>
      {/* Normalkort */}
      <div
        onClick={() => handleClick(true, rewardValue)}
        className="card"
        style={{
          cursor: "pointer",
          backgroundColor: isDone ? "grey" : "blue",
        }}
      >
        <p>{reward}</p>
      </div>

      {/* Fullscreenkort*/}
      {isFullscreen && ReactDOM.createPortal(<FullscreenCard />, document.body)}
    </>
  );
};

export default Card;
