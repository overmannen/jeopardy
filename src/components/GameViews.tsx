import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WarningModal from "./WarningModal";

export const GameViews = () => {
  const [games, setGames] = useState(["Game_1", "Game_2", "Game_3"]);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState<string | null>(null);

  const handleDeleteClick = (game: string) => {
    setGameToDelete(game);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (gameToDelete) {
      setGames((prevGames) =>
        prevGames.filter((game) => game !== gameToDelete)
      );
      setGameToDelete(null);
    }
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setGameToDelete(null);
  };

  const playGame = (game: string) => {
    navigate(`/play/${game}`);
  };
  const editGame = () => {
    return;
  };

  return (
    <div>
      <h3>Games:</h3>
      <ul>
        {games.map((game, id) => (
          <li key={id}>
            <p className="selectGame">{game}</p>
            <button onClick={() => handleDeleteClick(game)}>Delete</button>
            <button onClick={editGame}>Edit</button>
            <button onClick={() => playGame(game)}>Play</button>
          </li>
        ))}
      </ul>

      <WarningModal
        message="Er du sikker du å ønsker å slette dette spillet"
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
