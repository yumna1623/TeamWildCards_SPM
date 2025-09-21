import { Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import AdminDashBoardPage from "./pages/AdminDashBoardPage";
import JoinTeamPage from "./pages/JoinTeamPage"
import UserDashBoardPage from "./pages/UserDashBoardPage";
import Login from "./components/Login"
function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/create-team" element={<CreateTeamPage />} />
      <Route path="/join" element={<div>Join Team Page</div>} />
      <Route path="/AdminDashboard" element={<AdminDashBoardPage />} />
      <Route path="/join-team" element={<JoinTeamPage />} />
      <Route path="/UserDashBoardPage" element={<UserDashBoardPage />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  );
}

export default App;
