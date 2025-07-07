import { createContext, useState } from "react";
import { GameViews } from "../components/GameViews";

export const Home = () => {
  const [teamNames, setTeamNames] = useState<[string]>([""]);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome User</p>
      <p>
        Make a{" "}
        <a className="newGame" href="/game">
          new game
        </a>
      </p>
      <GameViews />
    </div>
  );
};
