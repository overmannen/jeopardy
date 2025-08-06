import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useMemo, useState } from "react";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { Category } from "../components/GameViews";

export const NewGame = () => {
  const navigate = useNavigate();

  const [gameName, setGameName] = useState("");
  const [categories, setCategories] = useState<string[]>(["", "", "", "", ""]);

  const gameCollectionRef = useMemo(() => {
    return collection(db, "games");
  }, []);

  const categoryCollectionRef = useMemo(() => {
    return collection(db, "categories");
  }, []);

  const updateGameName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameName(e.target.value);
  };

  const updateCategory = (index: number, value: string) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const handleSubmit = async () => {
    try {
      const gameDocRef = await addDoc(gameCollectionRef, {
        name: gameName,
        userId: auth?.currentUser?.uid,
      });

      const categoryObjects: Category[] = [];

      for (let index = 0; index < categories.length; index++) {
        if (categories[index].trim()) {
          const categoryDocRef = await addDoc(categoryCollectionRef, {
            name: categories[index],
            belongsTo: gameDocRef.id,
          });

          categoryObjects.push({
            id: categoryDocRef.id,
            name: categories[index],
            belongsTo: gameDocRef.id,
          });
        }
      }

      await setDoc(doc(db, "games", gameDocRef.id), {
        name: gameName,
        categories: categoryObjects,
        userId: auth?.currentUser?.uid,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="creation-container">
      <label htmlFor="game-name">Game Name</label>
      <input type="text" id="game-name" onChange={updateGameName} />
      <div className="new-categories">
        {categories.map((category, index) => (
          <div key={index}>
            <label htmlFor={`category-${index + 1}`}>
              Category {index + 1}
            </label>
            <input
              id={`category-${index + 1}`}
              type="text"
              value={category}
              onChange={(e) => updateCategory(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={handleSubmit}>
        Ready
      </button>
    </div>
  );
};
