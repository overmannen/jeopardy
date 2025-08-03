import { useEffect, useState } from "react";
import { GameViews } from "../components/GameViews";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/config";
import { SignInWithGoogle } from "../components/Authentication/SignInWithGoogle";
import { LogoutGoogle } from "../components/Authentication/LogoutGoogle";

export const Home = () => {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Jeopardy</h1>
      <div className="authentication-container">
        <SignInWithGoogle />
        {user && <LogoutGoogle />}
      </div>
      {user ? (
        <p className="user-name">
          Welcome <b>{user.displayName}</b>
        </p>
      ) : (
        <p>Not logged in</p>
      )}
      <p>
        Make a{" "}
        <a className="new-game" href="/game">
          new game
        </a>
      </p>
      <GameViews />
    </div>
  );
};
