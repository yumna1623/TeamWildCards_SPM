// src/components/user/UserSideBar.jsx
import {
  Users,
  ListTodo,
  BarChart3,
  Trophy,
  Layers,
  LogOut,
  User,
} from "lucide-react";

const UserSidebar = ({ activeTab, setActiveTab, userData }) => {
  const { user, team } = userData;

  const menuItems = [
    { id: "tasks", label: "Tasks", icon: <ListTodo /> },
    { id: "departments", label: "Departments", icon: <Layers /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 /> },
    { id: "leaderboard", label: "Leaderboard", icon: <Trophy /> },
  ];

  return (
    <div className="w-64 bg-[#394867] border-r border-gray-700 flex flex-col p-4 shadow-xl">
      {/* Brand */}
      <div className="p-5">
        <h2 className="font-bold text-4xl text-white">
          {userData?.team?.name || "No Team"}
        </h2>

        <p className="text-sm text-gray-200">
          Leader: {userData?.team?.leader?.name || "N/A"}
        </p>
        <p className="text-xs text-gray-400">
          {userData?.team?.leader?.email || ""}
        </p>
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-4 px-4 py-4 rounded-xl bg-white/10 mb-6">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-white">{user.name}</h3>
          <p className="text-sm text-gray-300 truncate">{user.email}</p>
        </div>
      </div>

      {/* Team Info */}
      <div className="flex items-center gap-2 text-sm text-gray-300 px-4 mb-6">
        <Users size={16} />
        <span className="font-medium">{team.totalMembers} Team Members</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition ${
              activeTab === item.id
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition ${
            activeTab === "profile"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-gray-300 hover:bg-white/10"
          }`}
        >
          <User />
          Profile
        </button>
      </nav>

      {/* Logout */}
      <div className="mt-auto px-2 py-4">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition text-gray-300 hover:bg-red-500 hover:text-white"
        >
          <LogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
