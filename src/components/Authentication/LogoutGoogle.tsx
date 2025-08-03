import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

export const LogoutGoogle = () => {
  const logoutGoogle = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button className="btn-secondary" onClick={logoutGoogle}>
        {" "}
        Sign Out{" "}
      </button>
    </div>
  );
};
