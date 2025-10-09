import { useState, useEffect } from "react";
import {
  LogOut,
  Layers,
  ListTodo,
  Trophy,
  ChevronDown,
  ChevronUp,
  User, 
  Users, 
} from "lucide-react";

const SideBar = ({ adminData, activeTab, setActiveTab, setShowTaskModal }) => {
  const [showTaskDropdown, setShowTaskDropdown] = useState(
    activeTab.startsWith("task") || activeTab === "viewTasks"
  );

  // Close/open dropdown based on activeTab prop
  useEffect(() => {
    setShowTaskDropdown(activeTab.startsWith("task") || activeTab === "viewTasks");
  }, [activeTab]);


  // Toggle dropdown
  const toggleTaskDropdown = () => {
    setShowTaskDropdown(!showTaskDropdown);
  };

  // Base classes for navigation items
  const baseNavItemClasses =
    "flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left transition-all duration-200";
  const defaultNavItemClasses = "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700";
  const activeNavItemClasses = "bg-indigo-600 text-white shadow-md font-semibold";
  // Increased dropdown text size from text-sm to text-base
  const dropdownItemClasses = "flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left text-base transition hover:bg-indigo-100 text-gray-700";
  const activeDropdownItemClasses = "bg-indigo-100 text-indigo-700 font-medium";

  return (
    <div className="w-64 bg-gray-50 text-gray-800 flex flex-col justify-between border-r border-gray-200 shadow-xl overflow-y-auto">
      {/* Top Section - Profile/Team Info */}
      <div className="p-5 flex flex-col gap-6">
        <header className="border-b border-gray-200 pb-4">
          {/* Team Name - Made larger and bolder */}
          <h2 className="text-4xl font-extrabold text-indigo-700 tracking-tight">
            {adminData.teamName}
          </h2>
          
          {/* REVISED ADMIN NAME & EMAIL SECTION */}
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase text-gray-400 mb-1">
              <User className="w-4 h-4" /> Team 
            </div>
            {/* Admin Name - Made larger and prominent */}
            
            <p className="text-xl font-extrabold text-gray-800 leading-tight">
              {adminData.leader?.name}
            </p>
            {/* Admin Email - Made slightly bigger */}
            <div className="flex  items-center gap-2 text-sm font-semibold uppercase text-gray-400 mb-1">
              <User className="w-4 h-4" /> Team Leader
            </div>
            <p className="text-base text-gray-500">{adminData.leader?.email}</p>
          </div>


          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-base text-gray-600">
            <Users className="w-5 h-5 text-indigo-500" />
            <span>
              Members:{" "}
              <span className="font-bold text-indigo-600">
                {adminData.totalMembers}
              </span>
            </span>
          </div>
        </header>

        {/* Navigation */}
        <nav className="space-y-2">
          {/* Departments */}
          <button
            onClick={() => setActiveTab("departments")}
            className={`${baseNavItemClasses} ${
              activeTab === "departments"
                ? activeNavItemClasses
                : defaultNavItemClasses
            }`}
          >
            <Layers className="w-5 h-5" /> Departments
          </button>

          {/* Tasks with Dropdown */}
          <div className="relative">
            <button
              onClick={toggleTaskDropdown}
              className={`${baseNavItemClasses} ${
                activeTab.startsWith("task") || activeTab === "viewTasks"
                  ? activeNavItemClasses
                  : defaultNavItemClasses
              } justify-between`}
            >
              <div className="flex items-center gap-3">
                <ListTodo className="w-5 h-5" /> Tasks
              </div>
              {showTaskDropdown ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* Dropdown Menu */}
            {showTaskDropdown && (
              <div className="ml-4 mt-1 space-y-1 p-2 bg-white rounded-xl border border-gray-100 shadow-inner">
                {/* Create Task */}
                <button
                  onClick={() => {
                    setActiveTab("tasks");
                    setShowTaskModal(true);
                  }}
                  className={`${dropdownItemClasses} ${
                    activeTab === "tasks" ? activeDropdownItemClasses : ""
                  }`}
                >
                  Create Task
                </button>

                {/* View Tasks */}
                <button
                  onClick={() => {
                    setActiveTab("viewTasks");
                    setShowTaskModal(false);
                  }}
                  className={`${dropdownItemClasses} ${
                    activeTab === "viewTasks" ? activeDropdownItemClasses : ""
                  }`}
                >
                  View Tasks
                </button>
              </div>
            )}
          </div>

          {/* Leaderboard */}
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`${baseNavItemClasses} ${
              activeTab === "leaderboard"
                ? activeNavItemClasses
                : defaultNavItemClasses
            }`}
          >
            <Trophy className="w-5 h-5" /> Leaderboard
          </button>
        </nav>
      </div>

      {/* Bottom Section - Logout */}
      <div className="p-5 border-t border-gray-200">
        <button
          onClick={() => setActiveTab("logout")}
          className="flex items-center justify-center gap-3 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl w-full transition duration-200 shadow-lg text-base"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;