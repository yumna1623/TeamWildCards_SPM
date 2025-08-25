import { Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import CreateTeamPage from "./pages/CreateTeamPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/create" element={<CreateTeamPage/>} />
      <Route path="/join" element={<div>Join Team Page</div>} />
    </Routes>
  );
}

export default App;
