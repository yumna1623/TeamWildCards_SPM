// src/components/user/UserDashboard.jsx
import { useState } from "react";
import UserSideBar from "./UserSideBar";
import UserDepartments from "./UserDepartments";
import UserLeaderboard from "./UserLeaderboard";
import UserTasks from "./UserTasks";
import UserProfile from "./UserProfile";

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
        {activeTab === "profile" && <UserProfile />}
      </div>
    </div>
  );
};

export default UserDashboard;
