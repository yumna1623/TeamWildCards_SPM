// src/components/user/UserDashboard.jsx
import { useState, useEffect } from "react";
import UserSideBar from "./UserSideBar";
import UserDepartments from "./UserDepartments";
import UserLeaderboard from "./UserLeaderboard";
import UserTasks from "./UserTasks";
import UserProfile from "./UserProfile";
import Analytics from '../Analytics'

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, please login.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/api/team/user-dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user dashboard data");

        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (!userData) return <p className="p-6 text-red-500">Failed to load data.</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar with backend data */}
      <UserSideBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userData={userData}
      />

      {/* Main Content */}
      <div className="flex-1">
        {activeTab === "tasks" && <UserTasks />}
        {activeTab === "departments" && <UserDepartments />}
        {activeTab === "analytics" && <Analytics />}
        {activeTab === "leaderboard" && <UserLeaderboard />}
        {activeTab === "profile" && <UserProfile />}
      </div>
    </div>
  );
};

export default UserDashboard;



