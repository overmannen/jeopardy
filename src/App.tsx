import { Navbar } from "./components/Navbar";
import { PlayGame } from "./pages/PlayGame";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/:gameId" element={<PlayGame />} />
        </Routes>
      </BrowserRouter>
      <div id="modal-root"></div>
    </>
  );
}

export default App;
