import { Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import AdminDashBoardPage from "./pages/AdminDashBoardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/create-team" element={<CreateTeamPage/>} />
      <Route path="/join" element={<div>Join Team Page</div>} />
      <Route path="/AdminDashboard" element={<AdminDashBoardPage/>} />

    </Routes>
  );
}

export default App;
