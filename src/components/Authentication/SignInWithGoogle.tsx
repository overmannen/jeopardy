import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";

export const SignInWithGoogle = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={signInWithGoogle}>
        Sign In
      </button>
    </div>
  );
};
