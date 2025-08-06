import { JSX } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          margin: "0",
          background: "linear-gradient(45deg, #ffd700, #ffed4e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontSize: "2rem",
          margin: "1rem 0",
          color: "#ffd700",
        }}
      >
        Page Not Found
      </h2>

      <button
        onClick={goHome}
        style={{
          padding: "1rem 2rem",
          background: "linear-gradient(135deg, #007bff, #0056b3)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "1.1rem",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, #0056b3, #004085)";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, #007bff, #0056b3)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Go Back Home
      </button>
    </div>
  );
};
