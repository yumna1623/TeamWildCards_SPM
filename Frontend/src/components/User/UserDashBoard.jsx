// src/components/user/UserDashboard.jsx
import { useState } from "react";
import UserSideBar from "./UserSideBar";
import UserDepartments from "./UserDepartments";
import UserProfile from "./UserProfile";
import UserLeaderboard from "./UserLeaderboard";
import UserTasks from "./UserTasks";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("tasks");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <UserSideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1">
        {activeTab === "tasks" && <UserTasks />}
        {activeTab === "departments" && <UserDepartments />}
        {activeTab === "analytics" && <UserProfile />}
        {activeTab === "leaderboard" && <UserLeaderboard />}
      </div>
    </div>
  );
};

export default UserDashboard;
