import { useState } from "react";
import {
  Users,
  ListTodo,
  BarChart3,
  Trophy,
  Layers,
  LogOut,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const UserSidebar = ({ activeTab, setActiveTab, userData }) => {
  const { user, team } = userData;
  const [showMembers, setShowMembers] = useState(false);

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
          {team?.name || "No Team"}
        </h2>

        <p className="text-sm text-gray-200">
          Leader: {team?.leader?.name || "N/A"}
        </p>
        <p className="text-xs text-gray-400">{team?.leader?.email || ""}</p>
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

      {/* Team Info with dropdown */}
      <div className="px-4 mb-4">
        <button
          onClick={() => setShowMembers(!showMembers)}
          className="flex items-center justify-between w-full text-sm text-gray-300 font-medium hover:text-white transition"
        >
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{team?.totalMembers || 0} Team Members</span>
          </div>
          {showMembers ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showMembers && (
          <div className="mt-2 ml-6 bg-white/10 rounded-lg p-2 text-gray-200 text-sm max-h-40 overflow-y-auto">
            {team?.members && team.members.length > 0 ? (
              team.members.map((member, idx) => (
                <div key={idx} className="border-b border-gray-600 py-1">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-xs text-gray-400">{member.email}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400">No members found</p>
            )}
          </div>
        )}
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
