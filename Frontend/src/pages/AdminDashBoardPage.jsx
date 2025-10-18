// src/pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/admin/Sidebar";
import Departments from "../components/admin/Departments";
import Tasks from "../components/admin/Tasks";
import ViewTasks from "../components/admin/ViewTasks";
import AdminLeaderboard from "../components/Admin/Leaderboard";
import Analytics from '../components/Analytics'

const AdminDashBoardPage = () => {
  const { user, token } = useAuth(); // ✅ keep role & user from context
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("departments");
  const [showTaskModal, setShowTaskModal] = useState(false);

  // ✅ Fetch Admin Dashboard Data
  const fetchAdminData = async () => {
    if (!token) {
      setError("No token found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/team/admin-dashboard", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized. Please log in again.");
        } else {
          throw new Error("Failed to fetch dashboard data");
        }
      }

      const data = await res.json();
      setTeamData(data.team);
      setError(null);
    } catch (err) {
      console.error("Error fetching admin data:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run once + auto-refresh every few seconds
  useEffect(() => {
    fetchAdminData();
    const interval = setInterval(fetchAdminData, 7000); // every 7 seconds
    return () => clearInterval(interval);
  }, [token]);

  // ✅ Persist login (in case AuthContext resets)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (!user && storedUser && storedToken) {
      // if AuthContext lost data temporarily, restore it
      window.location.reload(); // reload once to rehydrate context
    }
  }, [user]);

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!teamData) return <p className="p-6 text-gray-500">No team data available.</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        adminData={{ ...teamData, admin: user }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowTaskModal={setShowTaskModal}
      />

      <div className="flex-1 p-6">
        {activeTab === "departments" && <Departments />}
        {activeTab === "tasks" && <Tasks />}
        {activeTab === "viewTasks" && <ViewTasks />}
        {activeTab === "analytics" && <Analytics />}
        {activeTab === "leaderboard" && <AdminLeaderboard />}
      </div>
    </div>
  );
};

export default AdminDashBoardPage;
