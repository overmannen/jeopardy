import { useParams } from "react-router-dom";
import Container from "../components/Game/Container";
import { JSX } from "react";

export const EditGame = (): JSX.Element => {
  const { gameId } = useParams<{ gameId?: string }>();

  return (
    <div>
      <Container
        name={gameId || "unknown game"}
        teamNames={["lag1"]}
      ></Container>
    </div>
  );
};
