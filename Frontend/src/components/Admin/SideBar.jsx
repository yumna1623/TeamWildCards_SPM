// src/components/admin/SideBar.jsx
import { Users, LogOut, Layers, ListTodo, Trophy } from "lucide-react";

const SideBar = ({ adminData, activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-white text-gray-800 flex flex-col justify-between border-r border-gray-200 shadow-lg">
      {/* Top Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-indigo-700">{adminData.teamName}</h2>
        <p className="mt-2 text-sm font-medium">{adminData.adminName}</p>
        <p className="text-xs text-gray-500">{adminData.email}</p>
        <p className="mt-4 text-sm">
          Team Members:{" "}
          <span className="font-semibold text-indigo-600">{adminData.membersCount}</span>
        </p>

        {/* Navigation */}
        <nav className="mt-8 space-y-3">
          <button
            onClick={() => setActiveTab("departments")}
            className={`flex items-center gap-3 px-4 py-2 rounded-md w-full text-left transition ${
              activeTab === "departments"
                ? "bg-indigo-100 text-indigo-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <Layers className="w-5 h-5" /> Departments
          </button>

          <button
            onClick={() => setActiveTab("tasks")}
            className={`flex items-center gap-3 px-4 py-2 rounded-md w-full text-left transition ${
              activeTab === "tasks"
                ? "bg-indigo-100 text-indigo-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <ListTodo className="w-5 h-5" /> Tasks
          </button>

          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`flex items-center gap-3 px-4 py-2 rounded-md w-full text-left transition ${
              activeTab === "leaderboard"
                ? "bg-indigo-100 text-indigo-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <Trophy className="w-5 h-5" /> Leaderboard
          </button>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={() => setActiveTab("logout")}
          className="flex items-center gap-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md w-full transition"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
