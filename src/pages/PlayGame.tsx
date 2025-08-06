import { useLocation } from "react-router-dom";
import Container from "../components/Game/Container";
import { JSX, useEffect, useState } from "react";
import { Options } from "../components/Options";
import { Game } from "../components/GameViews";

export const PlayGame = (): JSX.Element => {
  const [isOptionsScreen, setIsOptionsScreen] = useState(true);
  const [teamNames, setTeamNames] = useState<string[]>([]);
  const [categoryStrings, setCategoryStrings] = useState<string[]>([]);

  const location = useLocation();
  const game = location.state?.game as Game;

  const handleTeamsSubmit = (teams: string[]) => {
    setTeamNames(teams);
    setIsOptionsScreen(false);
  };

  useEffect(() => {
    if (game?.categories) {
      const categoryNames = game.categories.map((category) => category.name);
      setCategoryStrings(categoryNames);
    }
    if (!game?.categories) {
      console.log("feil");
    }
  }, []);

  if (isOptionsScreen) {
    return (
      <div>
        <Options teamsSubmit={handleTeamsSubmit} />
      </div>
    );
  }

  return (
    <div>
      <Container
        name={game.name}
        teamNames={teamNames}
        categories={categoryStrings}
      ></Container>
    </div>
  );
};
