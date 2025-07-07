import { useParams } from "react-router-dom";
import Container from "../components/Game/Container";
import { JSX, useState } from "react";
import { Options } from "../components/Options";

export const PlayGame = (): JSX.Element => {
  const { gameId } = useParams<{ gameId?: string }>();
  const [isOptionsScreen, setIsOptionsScreen] = useState(true);
  const [teamNames, setTeamNames] = useState<string[]>([]);

  const handleTeamsSubmit = (teams: string[]) => {
    setTeamNames(teams);
    setIsOptionsScreen(false);
  };

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
        name={gameId || "unknown game"}
        teamNames={teamNames}
      ></Container>
    </div>
  );
};
