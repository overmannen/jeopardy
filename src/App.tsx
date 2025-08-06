import { Navbar } from "./components/Navbar";
import { PlayGame } from "./pages/PlayGame";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewGame } from "./pages/NewGame";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/:gameId" element={<PlayGame />} />
          <Route path="new-game" element={<NewGame />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <div id="modal-root"></div>
    </div>
  );
}

export default App;
