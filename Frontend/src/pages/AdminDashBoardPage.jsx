// src/pages/AdminDashboard.jsx
import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Departments from "../components/admin/Departments";
import Tasks from "../components/admin/Tasks";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("departments");

  // Fake admin/team data (replace with backend later)
  const adminData = {
    teamName: "TeamSync",
    adminName: "John Doe",
    email: "john@example.com",
    membersCount: 5,
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        adminData={adminData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === "departments" && <Departments />}
        {activeTab === "tasks" && <Tasks />}
        {activeTab === "logout" && <p>Logging out...</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
