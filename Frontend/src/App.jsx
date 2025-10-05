// src/App.jsx
import { Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import AdminDashBoardPage from "./pages/AdminDashBoardPage";
import JoinTeamPage from "./pages/JoinTeamPage";
import UserDashBoardPage from "./pages/UserDashBoardPage";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ wrapper

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HeroPage />} />
      <Route path="/create-team" element={<CreateTeamPage />} />
      <Route path="/join" element={<div>Join Team Page</div>} />
      <Route path="/join-team" element={<JoinTeamPage />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/AdminDashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashBoardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/UserDashBoardPage"
        element={
          <ProtectedRoute role="member">
            <UserDashBoardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
