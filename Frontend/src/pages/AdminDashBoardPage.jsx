// src/pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import Sidebar from "../components/admin/Sidebar";
import Departments from "../components/admin/Departments";
import Tasks from "../components/admin/Tasks";

const AdminDashBoardPage = () => {
  const [activeTab, setActiveTab] = useState("departments");
  const [adminData, setAdminData] = useState(null); // store data from backend
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);


useEffect(() => {
  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem("token"); // get token
      if (!token) {
        console.error("No token found, please login.");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5000/api/team/admin-dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch dashboard data");

      const data = await res.json();
      setAdminData(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setLoading(false);
    }
  };

  fetchAdminData();
}, []);



  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (!adminData) return <p className="p-6 text-red-500">Failed to load data.</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
     <Sidebar
  adminData={adminData}
  activeTab={activeTab}
  setActiveTab={setActiveTab} // ✅ Missing setShowTaskModal
    setShowTaskModal={setShowTaskModal} // ✅ pass setter

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

export default AdminDashBoardPage;
