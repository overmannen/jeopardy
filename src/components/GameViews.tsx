import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import WarningModal from "./WarningModal";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export type Game = {
  id: string;
  name: string;
  categories?: Category[];
  userId?: string;
};

export type Category = {
  id: string;
  name: string;
  belongsTo: string;
};

export const GameViews = () => {
  const [gamesList, setGamesList] = useState<Game[]>([]);
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameIdToDelete, setGameIdToDelete] = useState<string | null>(null);

  const handleDeleteClick = async (id: string) => {
    setGameIdToDelete(id);
    setIsModalOpen(true);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setGameIdToDelete(null);
  };

  const playGame = (game: Game) => {
    navigate(`/play/${game?.id}`, { state: { game } });
  };

  const editGame = () => {
    return;
  };

  const gameCollectionRef = useMemo(() => {
    return collection(db, "games");
  }, []);

  const getGamesList = async () => {
    if (!user) {
      setGamesList([]);
      return;
    }
    try {
      const gamesQuery = query(
        gameCollectionRef,
        where("userId", "==", user.uid)
      );

      const data = await getDocs(gamesQuery);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Game[];
      setGamesList(filteredData);
    } catch (error) {
      console.error(error);
      setGamesList([]);
    }
  };

  useEffect(() => {
    if (!loading) {
      getGamesList();
    }
  }, [user, loading]);

  const confirmDelete = async () => {
    if (gameIdToDelete) {
      try {
        const gameDoc = doc(db, "games", gameIdToDelete);
        await deleteDoc(gameDoc);
        setGamesList((prevGames) =>
          prevGames.filter((game) => game.id !== gameIdToDelete)
        );
        setGameIdToDelete(null);
        setIsModalOpen(false);
        getGamesList();
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!user) {
    return (
      <div className="games-container">
        <p>Log in to view your games</p>
      </div>
    );
  }

  return (
    <div className="games-container">
      <h3>Games:</h3>
      <ul>
        {gamesList.map((game) => (
          <li key={game.id}>
            <p className="select-game">{game.name}</p>
            <button
              className="btn-primary"
              onClick={() => handleDeleteClick(game.id)}
            >
              Delete
            </button>
            <button className="btn-primary" onClick={editGame}>
              Edit
            </button>
            <button className="btn-primary" onClick={() => playGame(game)}>
              Play
            </button>
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
