import { useState } from "react";
import { Users, ListTodo, BarChart3, Trophy, Layers, LogOut } from "lucide-react";

const UserSidebar = ({ activeTab, setActiveTab }) => {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@teamsync.com",
    teamMembers: 24,
  });

  const menuItems = [
    { id: "tasks", label: "Tasks", icon: <ListTodo /> },
    { id: "departments", label: "Departments", icon: <Layers /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 /> },
    { id: "leaderboard", label: "Leaderboard", icon: <Trophy /> },
  ];

  return (
    <div className="w-64 bg-[#394867] border-r border-gray-700 flex flex-col p-4 shadow-xl">
      <div className="p-4 mb-4">
        <h2 className="text-2xl font-bold text-white">
          TeamSync
        </h2>
      </div>

      <div className="flex items-center space-x-4 px-4 py-4 rounded-xl bg-white/10 mb-6">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-white">{user.name}</h3>
          <p className="text-sm text-gray-300 truncate">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-300 px-4 mb-6">
        <Users size={16} />
        <span className="font-medium">{user.teamMembers} Team Members</span>
      </div>

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
      </nav>

      <div className="mt-auto px-2 py-4">
        <button
          onClick={() => console.log("Logout clicked")}
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
